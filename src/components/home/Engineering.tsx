import { SectionHeader } from "@/components/ui/Section";

const layers = [
  { name: "Websites & apps", outcome: "Fast, easy screens for your staff and customers - on computer and mobile.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { name: "Business logic & APIs", outcome: "Reliable back-end that connects your systems together.", tools: ["Node.js", "Express", "Python", "Django REST Framework"] },
  { name: "Database", outcome: "Safe, organised data you can trust for decisions.", tools: ["PostgreSQL", "Prisma"] },
  { name: "Hosting & backup", outcome: "Secure servers, monitoring and regular backups.", tools: ["Docker", "Kubernetes", "Cloud"] },
];

/** Plain-language technology overview. */
export function Engineering() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Technology"
          title={["Modern, reliable technology"]}
          bn="আধুনিক ও নির্ভরযোগ্য প্রযুক্তি"
          intro="We choose tools that are proven, secure and easy to maintain, so your software keeps working for years."
        />
        <div className="card mt-12 overflow-hidden">
          <table className="w-full text-left">
            <thead className="hidden bg-brand-50 text-sm text-brand-dark md:table-header-group">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Layer</th>
                <th scope="col" className="px-6 py-3 font-semibold">What it does for you</th>
                <th scope="col" className="px-6 py-3 font-semibold">Tools we use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {layers.map((l) => (
                <tr key={l.name} className="grid gap-2 px-6 py-5 md:table-row md:p-0">
                  <th scope="row" className="font-semibold text-ink md:px-6 md:py-5">{l.name}</th>
                  <td className="text-slate md:px-6 md:py-5">{l.outcome}</td>
                  <td className="md:px-6 md:py-5">
                    <ul className="flex flex-wrap gap-1.5">
                      {l.tools.map((t) => (
                        <li key={t} className="rounded-md bg-cloud px-2.5 py-1 text-sm font-medium text-ink/80 ring-1 ring-line">{t}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
