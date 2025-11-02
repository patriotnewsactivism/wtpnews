import HeroSection from "@/components/HeroSection";
import FeaturedArticles from "@/components/FeaturedArticles";
import ConstitutionalToolPromo from "@/components/ConstitutionalToolPromo";
import BadActorsPromo from "@/components/BadActorsPromo";
import RecentArticles from "@/components/RecentArticles";
import Link from "next/link";
import { getLatestPosts, getPageBySlug, getPosts } from "@/data";

export const metadata = {
  title: "We The People News",
  description:
    "Redesigned archive of wtpnews.org featuring every article, resource, and investigative series.",
};

const resourceLinks = [
  { label: "Examples & Resources for ADA Title II Compliance", slug: "examples-and-resources-to-support-criminal-justice-entities-in-compliance-with-title-ii-of-the-americans-with-disabilities-act" },
  { label: "ADA Coordinator Requirements", slug: "requirement-of-ada-coordinator" },
  { label: "Patriot News Activism on YouTube", slug: "patriot-news-activism-on-youtube" },
  { label: "WTPN Videos", slug: "wtpn-videos" },
];

export default function Home() {
  const posts = getPosts();
  const [featured] = posts;
  const latest = getLatestPosts(3);
  const latestSlugs = new Set(latest.map((post) => post.slug));
  const additional = posts.filter((post) => !latestSlugs.has(post.slug)).slice(0, 6);
  const constitutionalTool = getPageBySlug("constitutional-rights-legal-research-tool");
  const badActors = getPageBySlug("bad-actors-the-album");

  return (
    <main>
      {featured ? <HeroSection featured={featured} /> : null}
      <div className="content">
        {latest.length ? <FeaturedArticles posts={latest} /> : null}
        {constitutionalTool ? <ConstitutionalToolPromo page={constitutionalTool} /> : null}
        {badActors ? <BadActorsPromo page={badActors} /> : null}
        {additional.length ? <RecentArticles posts={additional} /> : null}

        <section className="section">
          <div className="section__header">
            <h2>Featured resources</h2>
            <p>
              Direct access to every resource, video series, and long-form project preserved from
              the original WTP News website.
            </p>
          </div>
          <ul className="resource-grid">
            {resourceLinks.map((resource) => (
              <li key={resource.slug}>
                <Link className="card card--resource" href={`/${resource.slug}`}>
                  <span>{resource.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
