import Link from "next/link";
import type { Page } from "@/data";

type ConstitutionalToolPromoProps = {
  page: Page;
};

export default function ConstitutionalToolPromo({ page }: ConstitutionalToolPromoProps) {
  return (
    <section className="section section--highlight">
      <div className="section__header">
        <h2>{page.title}</h2>
        <p>{page.excerpt}</p>
      </div>
      <Link className="btn btn--light" href={`/${page.slug}`}>
        Explore the tool
      </Link>
    </section>
  );
}
