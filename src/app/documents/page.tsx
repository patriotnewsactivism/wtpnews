import Link from "next/link";

export const metadata = {
  title: "Documents - WTP News",
};

const documents = [
  {
    id: 1,
    title: "American Injustice",
    slug: "american-injustice",
    description: "A comprehensive analysis of constitutional violations and systemic issues in the American justice system."
  },
  {
    id: 2,
    title: "Crowder v. Reardon",
    slug: "crowder-v-reardon",
    description: "An analytical summary of proceedings in this important civil rights case."
  },
  {
    id: 3,
    title: "FOIA Evidence",
    slug: "foia-evidence",
    description: "Factual background and FOIA evidence of federal coordination and retaliation."
  }
];

export default function DocumentsPage() {
  return (
    <main className="content-section">
      <h1>Document Library</h1>
      <p className="text-center mb-8">
        Access our collection of investigative documents, legal filings, and evidence 
        supporting our civil rights reporting.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="card">
            <h2>{doc.title}</h2>
            <p className="mb-4">{doc.description}</p>
            <Link href={`/documents/${doc.slug}`} className="btn">
              View Document
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}