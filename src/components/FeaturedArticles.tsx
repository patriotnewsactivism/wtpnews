import Link from "next/link";
import type { Post } from "@/data";
import { formatDate } from "@/lib/formatters";

type FeaturedArticlesProps = {
  posts: Post[];
};

export default function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  return (
    <section className="section">
      <div className="section__header">
        <h2>Latest reporting</h2>
        <p>
          Deep dives, breaking investigations, and updates on the constitutional rights
          battles shaping the nation.
        </p>
      </div>
      <div className="grid">
        {posts.map((post) => {
          const published = formatDate(post.publishedAt ?? post.date);
          return (
            <article key={post.slug} className="card">
              <h3>{post.title}</h3>
              <p className="card__meta">
                {post.author ? `By ${post.author}` : "We The People News"}
                {published ? ` · ${published}` : null}
              </p>
              <p className="card__excerpt">{post.excerpt}</p>
              <Link className="card__link" href={`/articles/${post.slug}`}>
                Read more
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
