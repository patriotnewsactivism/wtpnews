import Link from "next/link";

export const metadata = {
  title: "Articles - WTP News",
};

// Sample articles data - in a real app, this would come from a CMS or database
const articles = [
  {
    id: 1,
    title: "Galveston Staged Arrest Sparks Federal Civil Rights Lawsuit & Demand for accountability",
    excerpt: "A routine drive across the causeway into Galveston turned into something far more sinister. Just after 2 a.m., investigative journalist and constitutional rights activist Matthew Reardon was pulled over by Galveston Police Department officers.",
    slug: "galveston-staged-arrest-federal-lawsuit",
    date: "September 12, 2025",
    author: "Don Matthews",
  },
  {
    id: 2,
    title: "Left Without Counsel, Left Without Argument: How Mississippi's Courts Compounded Injustice",
    excerpt: "Despite a Supreme Court order, Lafayette County refused to rule on an indigent appellant's request for counsel. Months later, the State failed to file a brief and the Court of Appeals denied oral argument.",
    slug: "justice-delayed-is-justice-denied",
    date: "September 11, 2025",
    author: "Don Matthews",
  },
  {
    id: 3,
    title: "Journalist Violently Arrested by Federal Agents for Protected Speech",
    excerpt: "Journalist Matthew Oliver Reardon was violently arrested outside the U.S. District Courthouse in Lafayette, Louisiana, for holding a sign reading 'Fuck the U.S. Marshals Service.'",
    slug: "journalist-violently-arrested-by-federal-agents-for-protected-speech",
    date: "August 27, 2025",
    author: "Don Matthews",
  },
  {
    id: 4,
    title: "U.S. Marshals Service and Department of Justice Exposed: FOIA Reveals #OperationSilenceThePress",
    excerpt: "A Journalist's FOIA Opens a Federal Window. On June 27, 2025, I filed a Freedom of Information Act request with the U.S. Marshals Service (USMS), seeking records about myself.",
    slug: "us-marshals-foia-operation-silence-the-press",
    date: "August 23, 2025",
    author: "Matthew Reardon",
  },
];

export default function ArticlesPage() {
  return (
    <main className="content-section">
      <h1>Articles</h1>
      <p className="text-center mb-8">
        Stay informed with our latest investigations into government corruption, 
        police misconduct, and First Amendment violations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="card">
            <h2>{article.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              By {article.author} / {article.date}
            </p>
            <p className="mb-4">{article.excerpt}</p>
            <Link href={`/articles/${article.slug}`} className="btn">
              Read More
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}