import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/data";
import { formatDate } from "@/lib/formatters";

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Article not found - We The People News",
    };
  }

  return {
    title: `${post.title} - We The People News`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const published = formatDate(post.publishedAt ?? post.date);

  return (
    <main className="content content--article">
      <article>
        <header className="article__header">
          <p className="article__eyebrow">WTP News Investigation</p>
          <h1>{post.title}</h1>
          <p className="article__meta">
            {post.author ? `By ${post.author}` : "We The People News"}
            {published ? ` · ${published}` : null}
          </p>
        </header>
        <div className="article__body" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="article__footer">
        <Link className="btn btn--outline" href="/articles">
          Back to all articles
        </Link>
      </div>
    </main>
  );
}
