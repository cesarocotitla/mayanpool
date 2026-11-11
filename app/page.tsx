import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Engineering from "@/components/Engineering";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileQuoteBar from "@/components/MobileQuoteBar";
import MotionProvider from "@/components/MotionProvider";

export default function HomePage() {
  return (
    <MotionProvider>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Engineering />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileQuoteBar />
    </MotionProvider>
  );
}
