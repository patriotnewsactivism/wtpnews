import Link from "next/link";
import { getPosts } from "@/data";
import { formatDate } from "@/lib/formatters";

export const metadata = {
  title: "Articles - We The People News",
  description: "Complete archive of every WTP News article captured from wtpnews.org.",
};

export default function ArticlesPage() {
  const posts = getPosts();

  return (
    <main className="content">
      <header className="section__header section__header--page">
        <h1>Articles</h1>
        <p>
          Every story published on wtpnews.org, preserved in full and organized chronologically
          for this React-powered archive.
        </p>
      </header>
      <div className="grid grid--three">
        {posts.map((post) => {
          const published = formatDate(post.publishedAt ?? post.date);
          return (
            <article key={post.slug} className="card">
              <h2>{post.title}</h2>
              <p className="card__meta">
                {post.author ? `By ${post.author}` : "We The People News"}
                {published ? ` · ${published}` : null}
              </p>
              <p className="card__excerpt">{post.excerpt}</p>
              <Link className="card__link" href={`/articles/${post.slug}`}>
                Read article
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
