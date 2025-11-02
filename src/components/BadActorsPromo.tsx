import Link from "next/link";
import type { Page } from "@/data";

type BadActorsPromoProps = {
  page: Page;
};

export default function BadActorsPromo({ page }: BadActorsPromoProps) {
  return (
    <section className="section section--music">
      <div className="section__header">
        <h2>{page.title}</h2>
        <p>{page.excerpt}</p>
      </div>
      <Link className="btn" href={`/${page.slug}`}>
        Listen now
      </Link>
    </section>
  );
}
