type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, tone = "light", id, className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <p className={`eyebrow mb-6 ${dark ? "text-aqua" : "text-teal-text"}`}>{eyebrow}</p>
      <h2 id={id} className={`heading-2 ${dark ? "text-white" : "text-abyss"}`}>
        {title}
      </h2>
    </div>
  );
}
