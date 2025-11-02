import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content content--page">
      <div className="section section--highlight" style={{ textAlign: "center" }}>
        <h1>Page not found</h1>
        <p>The page you were looking for doesn&rsquo;t exist in this archive.</p>
        <Link className="btn" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
