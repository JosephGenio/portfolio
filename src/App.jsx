import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WaveDivider from "./components/WaveDivider";

function App() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />
      <Hero />
      <WaveDivider fillClass="fill-bg-light/50" />
      <About />
      <WaveDivider flip fillClass="fill-bg-light/50" />
      <Skills />
      <WaveDivider fillClass="fill-bg-light/50" />
      <Projects />
      <WaveDivider flip fillClass="fill-bg-light/50" />
      <Experience />
      <WaveDivider fillClass="fill-bg-light/50" />
      <Contact />
      <WaveDivider flip fillClass="fill-bg-light/50" />
      <Footer />
    </div>
  );
}

export default App;
