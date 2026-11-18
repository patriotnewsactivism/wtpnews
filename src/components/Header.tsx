import Link from "next/link";
import Logo from "./Logo";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const primaryLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Blog", href: "/blog" },
  { label: "Bad Actors Album", href: "/bad-actors-the-album" },
  { label: "Videos", href: "/wtpn-videos" },
  { label: "Patriot News", href: "/patriot-news-activism-on-youtube" },
  { label: "Constitutional Rights Tool", href: "/constitutional-rights-legal-research-tool" },
  { label: "Newsletter", href: "/newsletter" },
];

const secondaryLinks: NavLink[] = [
  {
    label: "Constitutional Rights Network",
    href: "https://crn.wtpnews.org",
    external: true,
  },
  {
    label: "ADA Title II Tutorial",
    href: "https://adata.org/project/ada-title-ii-ada-coordinators",
    external: true,
  },
  {
    label: "DOJ ADA Toolkit",
    href: "https://archive.ada.gov/pcatoolkit/toolkitmain.htm",
    external: true,
  },
];

const renderLink = ({ href, label, external }: NavLink) => {
  if (external) {
    return (
      <a className="nav__link" href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className="nav__link" href={href}>
      {label}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="nav" aria-label="Primary navigation">
          <ul className="nav__list">
            {primaryLinks.map((link) => (
              <li key={link.href}>{renderLink(link)}</li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="site-header__subnav" aria-label="Additional resources">
        <ul className="nav__list nav__list--compact">
          {secondaryLinks.map((link) => (
            <li key={link.href}>{renderLink(link)}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
