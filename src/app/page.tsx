import Link from "next/link";
import HeroSection from "../components/HeroSection";
import FeaturedArticles from "../components/FeaturedArticles";
import ConstitutionalToolPromo from "../components/ConstitutionalToolPromo";
import BadActorsPromo from "../components/BadActorsPromo";

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
    <main>
      <HeroSection />
      <div className="content-section">
        <FeaturedArticles />
        <ConstitutionalToolPromo />
        <BadActorsPromo />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Explore Our Content</h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-500 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}