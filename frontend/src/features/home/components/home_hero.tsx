export const Home_hero = () => {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Full-stack starter
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-slate-600">
        Frontend uses Next.js, TypeScript, and Tailwind. Backend uses Express (ES modules),
        Prisma, PostgreSQL, Zod, and CORS — with snake_case naming across the codebase.
      </p>
    </section>
  );
};
