import Link from "next/link";

export const metadata = {
  title: "WTP News",
};

export default function Home() {
  return (
    <main>
      <h1>WTP News</h1>
      <p>Investigations, accountability, and civil-rights reporting.</p>
      <nav>
        <ul>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <Link href="/documents">Documents</Link>
          </li>
          <li>
            <Link href="/bad-actors-album">Bad Actors Album</Link>
          </li>
          <li>
            <Link href="/constitutional-rights-tool">Constitutional Rights Tool</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
