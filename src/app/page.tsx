import Link from "next/link";

export const metadata = {
  title: "WTP News",
};

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/documents", label: "Documents" },
  { href: "/bad-actors-album", label: "Bad Actors Album" },
  { href: "/constitutional-rights-tool", label: "Constitutional Rights Tool" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="text-4xl font-bold mb-4">WTP News</h1>
      <p className="mb-8 text-lg text-gray-700">
        Investigations, accountability, and civil-rights reporting.
      </p>
      <ul className="flex flex-wrap justify-center gap-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
