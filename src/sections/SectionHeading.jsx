export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-16" aria-hidden />
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-gold sm:text-[0.67rem]">
            {eyebrow}
          </p>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-16" aria-hidden />
        </div>
      ) : null}
      <h2 className="mt-4 font-display text-balance text-2xl font-semibold leading-[1.18] tracking-tight text-foreground sm:mt-5 sm:text-3xl md:text-[2.35rem] md:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
