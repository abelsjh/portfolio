import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import BeyondCode from "@/components/BeyondCode";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        <Hero />
        <Journey />
        <TechStack />
        <Works />
        <BeyondCode />
        <Contact />
      </main>
    </>
  );
}





