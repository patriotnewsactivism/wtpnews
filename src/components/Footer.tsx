import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__title">We The People News</p>
        <p className="site-footer__tagline">
          Investigative journalism documenting constitutional violations, demanding
          transparency, and amplifying the voices of impacted communities.
        </p>
        <div className="site-footer__links">
          <Link href="mailto:contact@wtpnews.org">contact@wtpnews.org</Link>
          <a href="https://cash.app/$1Aaudit" target="_blank" rel="noreferrer">
            Support via CashApp
          </a>
          <a
            href="https://www.youtube.com/channel/UCf46xln_ufkayZ9HtFDcA8Q/"
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
        </div>
        <p className="site-footer__credit">
          © {new Date().getFullYear()} We The People News · Powered by a Pissed Off Patriot
        </p>
      </div>
    </footer>
  );
}
