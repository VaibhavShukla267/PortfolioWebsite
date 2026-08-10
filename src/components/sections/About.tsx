import SectionHeading from "@/components/ui/SectionHeading";
import RevealText from "@/components/ui/RevealText";
import { education } from "@/lib/data";

const facts = [
  { label: "Based in", value: "India" },
  { label: "Currently at", value: "AlphaBits Solutions" },
  { label: "Focus", value: "Web Production · GenAI Automation" },
  { label: "Education", value: education[0].degree.match(/\(([^)]+)\)/)?.[1] ?? "MCA" },
];

export default function About() {
  return (
    <section id="about" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Where brand-tight UI meets"
          accent="AI-driven production."
        />

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-16 sm:gap-14 lg:grid-cols-[1.6fr_1fr]">
          <RevealText
            as="p"
            by="lines"
            className="font-display text-xl font-medium leading-snug text-text-secondary sm:text-2xl md:text-3xl lg:text-[2.1rem] balance"
          >
            Detail-oriented full-stack developer and MCA graduate with a
            strong focus on web production, content delivery, and GenAI
            workflows. I maintain high-traffic platforms with a deep
            understanding of technical SEO, UX principles, and brand identity
            standards — leveraging React, Next.js, and modern AI automation
            to optimize digital content lifecycles and execute go-to-market
            strategy rollouts.
          </RevealText>

          <div className="glass flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
                  {fact.label}
                </div>
                <div className="mt-1.5 font-display text-lg text-text-primary">
                  {fact.value}
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                Open to new opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
