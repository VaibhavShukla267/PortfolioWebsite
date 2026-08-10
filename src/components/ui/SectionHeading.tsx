import RevealText from "./RevealText";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  /** Trailing phrase rendered in a muted italic, echoing the rest of the headline. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      <div
        className={`mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-border-strong" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl balance">
        <RevealText as="span" by="words" className="inline">
          {title}
        </RevealText>
        {accent ? (
          <>
            {" "}
            <span className="font-normal italic text-text-tertiary">
              {accent}
            </span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base text-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
