import Link from "next/link";

export const metadata = {
  title: "Documents - We The People News",
  description: "Download original investigative PDFs and court filings referenced across WTP News.",
};

const documents = [
  {
    id: 1,
    title: "American Injustice",
    slug: "american-injustice",
    description:
      "Comprehensive analysis of constitutional violations and systemic issues in the American justice system.",
  },
  {
    id: 2,
    title: "Crowder v. Reardon",
    slug: "crowder-v-reardon",
    description: "Analytical summary of the proceedings in Crowder v. Reardon (CV-2016-422W).",
  },
  {
    id: 3,
    title: "FOIA Evidence",
    slug: "foia-evidence",
    description: "Factual background and FOIA evidence of federal coordination and retaliation.",
  },
];

export default function DocumentsPage() {
  return (
    <main className="content">
      <header className="section__header section__header--page">
        <h1>Document library</h1>
        <p>
          Primary source documents referenced throughout WTP News reporting, preserved as
          downloadable PDFs for researchers and legal advocates.
        </p>
      </header>
      <div className="grid grid--three">
        {documents.map((doc) => (
          <article key={doc.id} className="card">
            <h2>{doc.title}</h2>
            <p className="card__excerpt">{doc.description}</p>
            <Link className="btn btn--outline" href={`/documents/${doc.slug}`}>
              Open PDF
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
