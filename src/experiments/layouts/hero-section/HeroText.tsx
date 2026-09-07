interface HeroTextProps {
  headline: string;
  subheading: string;
}

/** Sits below the hero image for now — placement is still open (see README). */
export function HeroText({ headline, subheading }: HeroTextProps) {
  return (
    <div className="px-6 py-8 text-center sm:px-8">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{headline}</h2>
      <p className="mt-2 text-sm text-white/70 sm:text-base">{subheading}</p>
    </div>
  );
}
