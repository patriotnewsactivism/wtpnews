// @ts-nocheck
import Link from "next/link";

// Sample article data - in a real app, this would come from a CMS or database
const articles = {
  "galveston-staged-arrest-federal-lawsuit": {
    title: "Galveston Staged Arrest Sparks Federal Civil Rights Lawsuit & Demand for accountability",
    author: "Don Matthews",
    date: "September 12, 2025",
    content: `
      <p>GALVESTON, TX- On August 11, 2023, a routine drive across the causeway into Galveston turned into something far more sinister. Just after 2 a.m., investigative journalist and constitutional rights activist Matthew Reardon was pulled over by Galveston Police Department officers. Within minutes, what began as a traffic stop became a felony DWI investigation and arrest.</p>
      
      <p>The officers claimed to smell alcohol. Reardon, who had not consumed a drop in years, immediately denied it and demanded a breathalyzer—the most direct way to prove sobriety. Officers refused. Instead, they pushed for field sobriety tests that he declined, citing their unreliability, and then arrested him anyway.</p>
      
      <p>At the hospital, the refusal to administer a breathalyzer escalated to something darker: a forced blood draw. Nearly a dozen officers restrained him while he was handcuffed, puncturing his arm multiple times with needles. No warrant was shown. Toxicology results later confirmed what Reardon had said all along: no alcohol in his system.</p>
      
      <h2>The Mississippi Connection</h2>
      
      <p>The arrest did not stop at Galveston's borders. While in booking, Reardon overheard his arresting officer on the phone with Lafayette County, Mississippi Deputy Kandace Beavers—an officer who had previously testified against him in a 2021 DUI case now under appeal.</p>
      
      <p>That case remains pending before the Mississippi Court of Appeals. Crucial evidence in that trial "disappeared" before the court ever saw it. Less than a year later, it was Beavers' testimony in a separate, unrelated matter—now alleged and demonstrated as perjury—which sent Reardon to prison for a year.</p>
      
      <p>On August 2, 2023, just one day after being released from prison, Reardon published a video exposé showing undeniable proof that Beavers intentionally lied under oath to send him to prison. Her voice surfacing again just 9 days later on August 11, 2023. This time through a phone call to Galveston Police officer William Osteen, pointing now to something bigger, much bigger: a cross-state conspiracy to escalate charges and silence a critic.</p>
      
      <blockquote>
        <p>The call recordings couldn't be clearer. The FBI had an obligation and responsibility to intervene, by acknowledging communication with me, that I did exactly as I was advised in trying to report law enforcement corruption involving the Lafayette County Sheriff's Department. Silence is complicity and in this case, culpability. They knew she lied and they chose to stay silent despite direct involvement. And because of their intent in not intervening and allowing such an unconscionable injustice to manifest, Beavers attacked again, and this time far worse. To this day, not a word out of the FBI. There is no question this is neglect to prevent. This nightmare has malicious intent all over it. Both by Beavers and the FBI.</p>
        <p>- Matthew Reardon</p>
      </blockquote>
      
      <h2>The Role of Officer William Osteen</h2>
      
      <p>At the center of the Galveston arrest was Officer William Osteen. His body-worn camera footage captured him asking, within minutes of the stop: "You an auditor man?", telling one officer "this one's an auditor, I got this one", and then claiming to yet another officer that he could "go off slurred speech and the smell" to justify an arrest.</p>
      
      <p>The record shows contradiction after contradiction. In his sworn affidavit, Osteen marked "odor of alcoholic beverage on breath: moderate", but later admitted he never smelled alcohol on Reardon's breath. He testified to both "dilated pupils" and "pinpoint pupils" in separate hearings. And most damning, he falsely told the court that toxicology results showed alcohol in Reardon's system when they did not.</p>
      
      <p>On February 25, 2025, Reardon's attorney, Ben Campagna, filed a Motion for Franks Hearing—a constitutional proceeding held when an officer inserts falsehoods or omits critical facts from a warrant application. If the lies are removed, there was never probable cause for the arrest.</p>
      
      <h2>Back to Galveston</h2>
      
      <p>This September, Reardon returned to Galveston—not in custody, but standing outside the police department with cameras rolling. His livestreams drew national attention, part of a broader push to hold the same officers accountable who once staged his arrest.</p>
      
      <p>The trip was more than symbolic. It placed the department back under the spotlight, showing residents that Reardon was not backing down and that the fight for accountability was being waged both in the streets and in court.</p>
      
      <h2>The Federal Lawsuit</h2>
      
      <p>Alongside the return trip came the legal escalation. In U.S. District Court, Reardon filed a sweeping civil rights lawsuit under 42 U.S.C. § 1983, naming the Galveston Police Department, Officer Osteen, UTMB Hospital staff, and collaborating Mississippi officials.</p>
      
      <p>The case is now active, with federal summons issued requiring the defendants to formally answer. The complaint alleges false arrest, excessive force, conspiracy across jurisdictions, and violations of the First, Fourth, and Fourteenth Amendments.</p>
    `
  },
  "journalist-violently-arrested-by-federal-agents-for-protected-speech": {
    title: "Journalist Violently Arrested by Federal Agents for Protected Speech",
    author: "Don Matthews",
    date: "August 27, 2025",
    content: `
      <p>FOR IMMEDIATE RELEASE- August 27, 2025</p>
      
      <p>Journalist Violently Arrested for Protected Speech: "Cohen v. California Has Already Decided This"</p>
      
      <p>LAFAYETTE, LA — On August 25, 2025, journalist Matthew Oliver Reardon was violently arrested outside the U.S. District Courthouse in Lafayette, Louisiana, for holding a sign reading "Fuck the U.S. Marshals Service." The arrest and assault occurred despite clear precedent from the U.S. Supreme Court in Cohen v. California (1971), which ruled that "one man's vulgarity is another's lyric" and protected speech cannot be criminalized just because it offends.</p>
      
      <p>Reardon was physically assaulted by U.S. Marshals, who destroyed thousands of dollars of press equipment, shackled him, and disappeared him into a parish jail with no charges. This incident represents a direct violation of First Amendment protections and demonstrates a pattern of retaliation against independent journalists and citizens who dare to challenge abuse of power.</p>
      
      <p>This exact issue was already decided by the U.S. Supreme Court in Cohen v. California (1971), when the Court ruled that "one man's vulgarity is another's lyric." Protected speech cannot be criminalized just because it offends.</p>
      
      <p>But in 2025, history repeated itself. Federal agents ignored the Constitution, destroyed thousands of dollars of press equipment, shackled me, disappeared me into a parish jail with no charges, and tortured me in custody. This is not law enforcement — this is retaliation against free speech.</p>
      
      <p>I am fighting back — to replace my destroyed equipment, recover my vehicle, and hire a top-tier attorney to take this all the way. This isn't about a "30-day misdemeanor." This is about whether the First Amendment still stands in America.</p>
      
      <p>Share this video. Support the cause. Stand up for free speech before it's too late.</p>
    `
  }
};

export default function ArticlePage({ params }) {
  const article = articles[params.slug];
  
  if (!article) {
    return (
      <main className="content-section">
        <h1>Article Not Found</h1>
        <p>Sorry, the article you requested could not be found.</p>
        <Link href="/articles" className="btn">
          Back to Articles
        </Link>
      </main>
    );
  }

  return (
    <main className="article-content">
      <h1>{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {article.author} / {article.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <Link href="/articles" className="btn mt-8">
        Back to Articles
      </Link>
    </main>
  );
}