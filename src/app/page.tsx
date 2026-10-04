import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Engines from "@/components/Engines";
import Stats from "@/components/Stats";
import Deliver from "@/components/Deliver";
import IpsCarousel from "@/components/IpsCarousel";
import Brands from "@/components/Brands";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content/store";

/* Content comes from the shared MongoDB document, so render per request. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContent();
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header data={c.header} socials={c.socials} />
      <main className="flex-1">
        <Hero data={c.hero} />
        <Engines data={c.engines} />
        <Stats data={c.stats} />
        <Deliver data={c.deliver} />
        <IpsCarousel data={c.ips} />
        <Brands data={c.brands} />
        <Portfolio data={c.portfolio} />
        <Contact data={c.contact} />
      </main>
      <Footer data={c.footer} socials={c.socials} />
    </div>
  );
}
