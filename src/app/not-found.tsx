import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <p className="mb-4">The page you requested doesn&apos;t exist.</p>
      <Link href="/" className="text-blue-700 underline">
        Go home
      </Link>
    </div>
  );
}
