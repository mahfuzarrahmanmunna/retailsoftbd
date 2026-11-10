import { site } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-white px-6 py-20 text-center">
      <div>
        <p className="text-7xl font-bold text-brand-dark">404</p>
        <h1 className="h2 mt-4 text-ink">Sorry, this page was not found.</h1>
        <p lang="bn" className="bn mt-2 text-lg text-accent">দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি।</p>
        <p className="lede mx-auto mt-4 max-w-lg text-slate">The page may have moved. Go back to the home page or call us - we&rsquo;ll help.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#" variant="brand">Back to Home</ButtonLink>
          <ButtonLink href={`tel:${site.contact.phone}`} variant="outline">Call {site.contact.phoneDisplay}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
