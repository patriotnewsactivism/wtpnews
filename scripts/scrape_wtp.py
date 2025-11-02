#!/usr/bin/env python3
"""Scrape wtpnews.org content into local JSON files."""
import json
import re
import sys
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import List, Optional
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.wtpnews.org"
SITEMAPS = {
    "posts": f"{BASE_URL}/post-sitemap.xml",
    "pages": f"{BASE_URL}/page-sitemap.xml",
}
OUTPUT_DIR = Path("src/data")
USER_AGENT = "Mozilla/5.0 (compatible; WTPNewsScraper/1.0; +https://www.wtpnews.org)"

HEADERS = {"User-Agent": USER_AGENT}


@dataclass
class ContentItem:
    slug: str
    url: str
    title: str
    content: str
    excerpt: str
    date: Optional[str]
    author: Optional[str]
    categories: List[str]
    tags: List[str]


class ScrapeError(RuntimeError):
    pass


def fetch(url: str) -> str:
    response = requests.get(url, headers=HEADERS, timeout=30)
    if response.status_code != 200:
        raise ScrapeError(f"Failed to fetch {url}: {response.status_code}")
    return response.text


def parse_sitemap(url: str) -> List[str]:
    from xml.etree import ElementTree as ET

    xml_text = fetch(url)
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        raise ScrapeError(f"Could not parse sitemap {url}: {exc}") from exc

    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [
        loc.text.strip()
        for loc in root.findall(".//s:url/s:loc", ns)
        if loc.text
    ]
    return urls


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.strip("/")
    if not path:
        return "home"
    return path.rstrip("/").split("/")[-1]


def clean_excerpt(text: str, limit: int = 240) -> str:
    single_line = re.sub(r"\s+", " ", text).strip()
    if len(single_line) <= limit:
        return single_line
    cut = single_line[: limit + 1]
    last_space = cut.rfind(" ")
    if last_space == -1:
        return cut[: limit].rstrip() + "…"
    return cut[:last_space].rstrip() + "…"


def extract_taxonomy(article) -> tuple[list[str], list[str]]:
    classes = article.get("class", []) if article else []
    categories: List[str] = []
    tags: List[str] = []
    for cls in classes:
        if cls.startswith("category-"):
            categories.append(cls.removeprefix("category-"))
        elif cls.startswith("tag-"):
            tags.append(cls.removeprefix("tag-"))
    return categories, tags


def extract_meta_from_jsonld(soup: BeautifulSoup) -> tuple[Optional[str], Optional[str]]:
    import json

    for script in soup.find_all("script", type="application/ld+json"):
        if not script.string:
            continue
        try:
            data = json.loads(script.string)
        except json.JSONDecodeError:
            continue
        items = data if isinstance(data, list) else [data]
        for item in items:
            if isinstance(item, dict) and item.get("@type") in {"Article", "NewsArticle", "BlogPosting"}:
                author = None
                if isinstance(item.get("author"), dict):
                    author = item["author"].get("name")
                elif isinstance(item.get("author"), list) and item["author"]:
                    entry = item["author"][0]
                    if isinstance(entry, dict):
                        author = entry.get("name")
                    elif isinstance(entry, str):
                        author = entry
                date = item.get("datePublished") or item.get("dateCreated")
                return author, date
    return None, None


def parse_content(url: str) -> ContentItem:
    html = fetch(url)
    soup = BeautifulSoup(html, "html.parser")
    article = soup.find("article")
    entry = soup.select_one("div.entry-content")
    if entry is None:
        raise ScrapeError(f"Could not find entry content for {url}")
    title_tag = soup.select_one("h1.entry-title") or soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else slug_from_url(url)
    content_html = entry.decode_contents()
    excerpt = clean_excerpt(entry.get_text(" ", strip=True))
    author, date = extract_meta_from_jsonld(soup)
    categories, tags = extract_taxonomy(article)
    return ContentItem(
        slug=slug_from_url(url),
        url=url,
        title=title,
        content=content_html,
        excerpt=excerpt,
        date=date,
        author=author,
        categories=categories,
        tags=tags,
    )


def collect(kind: str) -> List[ContentItem]:
    urls = parse_sitemap(SITEMAPS[kind])
    items_by_slug: dict[str, ContentItem] = {}
    for url in urls:
        # Skip duplicate home entry for posts sitemap
        if kind == "posts" and url.rstrip("/") == BASE_URL.rstrip("/"):
            continue
        try:
            item = parse_content(url)
        except ScrapeError as exc:
            print(f"Warning: {exc}", file=sys.stderr)
            continue
        if item.slug in items_by_slug:
            # Prefer the first occurrence.
            print(
                f"Skipping duplicate slug '{item.slug}' from {url}",
                file=sys.stderr,
            )
            continue
        items_by_slug[item.slug] = item
        print(f"Fetched {kind[:-1]}: {item.slug}")
    return list(items_by_slug.values())


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    data = {kind: [asdict(item) for item in collect(kind)] for kind in SITEMAPS}
    for kind, items in data.items():
        path = OUTPUT_DIR / f"{kind}.json"
        path.write_text(json.dumps(items, indent=2, ensure_ascii=False))
        print(f"Wrote {path} ({len(items)} entries)")


if __name__ == "__main__":
    main()
