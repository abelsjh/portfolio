import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import DevActivity from "@/components/DevActivity";
import BeyondCode from "@/components/BeyondCode";
import Contact from "@/components/Contact";
import StickyFooter from "@/components/StickyFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <StickyFooter />
      <main>
        <Hero />
        <Journey />
        <TechStack />
        <Works />
        <DevActivity />
        <BeyondCode />
        <Contact />
      </main>
    </>
  );
}





