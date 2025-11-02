import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="We The People News home">
      <span className="logo__mark">WTP</span>
      <span className="logo__text">We The People News</span>
    </Link>
  );
}
