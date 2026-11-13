import Hero from "../../components/sections/Hero";
import NewReleases from "../../components/sections/NewReleases";
import Collections from "../../components/sections/Collections";
import HowItsMade from "../../components/sections/HowItsMade";
import Contact from "../../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NewReleases />
      <Collections />
      <HowItsMade />
      <Contact />
    </>
  );
}
