import Link from "next/link";
import type { Post } from "@/data";
import { formatDate } from "@/lib/formatters";

type HeroSectionProps = {
  featured: Post;
};

export default function HeroSection({ featured }: HeroSectionProps) {
  const published = formatDate(featured.publishedAt ?? featured.date);

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__intro">
          <span className="hero__kicker">We The People News</span>
          <h1>Independent investigative journalism demanding accountability.</h1>
          <p>
            Reporting on constitutional rights, government overreach, and the fight to
            protect civil liberties across the United States.
          </p>
        </div>
        <article className="hero__feature">
          <p className="hero__eyebrow">Latest investigation</p>
          <h2>{featured.title}</h2>
          <p className="hero__meta">
            {featured.author ? `By ${featured.author}` : "We The People News"}
            {published ? ` · ${published}` : null}
          </p>
          <p className="hero__excerpt">{featured.excerpt}</p>
          <Link className="btn" href={`/articles/${featured.slug}`}>
            Read the full report
          </Link>
        </article>
      </div>
    </section>
  );
}
