import type { ReactNode } from "react";

/** Mono label above section titles: ● SOFTWARE */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <p className={tone === "dark" ? "tag !text-white/50" : "tag"}>{children}</p>;
}

/** Renders a title; `accent` (a phrase inside it) gets the brand gradient. */
export function AccentTitle({ text, accent }: { text: string; accent?: string; scribble?: boolean; dark?: boolean }) {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span className="text-gradient">{accent}</span>
      {after}
    </>
  );
}

/**
 * Section heading: label, title (lines rise in on scroll), Bangla line and intro.
 * `title` is an array of lines for backwards compatibility; lines are joined with a space.
 */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  bn,
  intro,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: string[];
  accent?: string;
  scribble?: boolean;
  bn?: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center [&_.tag]:justify-center [&_.lede]:mx-auto" : ""}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag data-split className={`${Tag === "h1" ? "h1" : "h2"} mt-4 ${dark ? "text-white" : "text-ink"}`}>
        <AccentTitle text={title.join(" ")} accent={dark ? accent : undefined} />
      </Tag>
      {bn && (
        <p lang="bn" className={`bn mt-3 text-lg ${dark ? "text-teal" : "text-teal-text"}`}>
          {bn}
        </p>
      )}
      {intro && <p id={id} className={`lede mt-4 max-w-2xl ${dark ? "text-white/70" : "text-slate"}`}>{intro}</p>}
    </div>
  );
}
