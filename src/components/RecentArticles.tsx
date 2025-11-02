import Link from "next/link";
import type { Post } from "@/data";
import { formatDate } from "@/lib/formatters";

type RecentArticlesProps = {
  posts: Post[];
};

export default function RecentArticles({ posts }: RecentArticlesProps) {
  return (
    <section className="section">
      <div className="section__header">
        <h2>More stories</h2>
        <p>Every article includes the full text captured from the original WTP News site.</p>
      </div>
      <ul className="list">
        {posts.map((post) => {
          const published = formatDate(post.publishedAt ?? post.date);
          return (
            <li key={post.slug} className="list__item">
              <div>
                <h3>
                  <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="list__meta">
                  {post.author ? `By ${post.author}` : "We The People News"}
                  {published ? ` · ${published}` : null}
                </p>
              </div>
              <p className="list__excerpt">{post.excerpt}</p>
            </li>
          );
        })}
      </ul>
      <div className="section__cta">
        <Link className="btn btn--outline" href="/articles">
          Browse all articles
        </Link>
      </div>
    </section>
  );
}
