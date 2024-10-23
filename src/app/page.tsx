import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Stats from "@/components/landing/landing-stats";
import NavBar from "@/components/landing/nav-bar";
import Teams from "@/components/landing/team";
import Testimonials from "@/components/landing/testimonial";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex flex-col w-full h-full gap-10">
        <Hero />
        <Stats />
        <Features />
        <Teams />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
