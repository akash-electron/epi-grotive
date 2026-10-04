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

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Engines />
        <Stats />
        <Deliver />
        <IpsCarousel />
        <Brands />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
