import { notFound } from "next/navigation";
import { getPageBySlug, getPages } from "@/data";
import { formatDate } from "@/lib/formatters";

const HIDDEN_SLUGS = new Set(["home"]);

export async function generateStaticParams() {
  return getPages()
    .filter((page) => !HIDDEN_SLUGS.has(page.slug))
    .map((page) => ({ slug: page.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) {
    return { title: "Page not found - We The People News" };
  }

  return {
    title: `${page.title} - We The People News`,
    description: page.excerpt,
  };
}

export default async function SitePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || HIDDEN_SLUGS.has(page.slug)) {
    notFound();
  }

  const published = formatDate(page.date);

  return (
    <main className="content content--page">
      <article>
        <header className="article__header">
          <p className="article__eyebrow">WTP News Resource</p>
          <h1>{page.title}</h1>
          {published ? <p className="article__meta">Updated {published}</p> : null}
        </header>
        <div className="article__body" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </main>
  );
}
