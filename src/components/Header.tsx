import Logo from './Logo';

export default function Header() {
  return (
    <header className="header">
      <div className="nav">
        <Logo />
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/documents">Documents</a></li>
            <li><a href="/bad-actors-album">Bad Actors Album</a></li>
            <li><a href="/constitutional-rights-tool">Constitutional Rights Tool</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}