import Link from "next/link";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/documents", label: "Documents" },
  { href: "/bad-actors-album", label: "Bad Actors Album" },
  { href: "/constitutional-rights-tool", label: "Constitutional Rights Tool" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">WTP News</Link>
        <ul className="flex flex-wrap gap-4 mt-2 sm:mt-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
