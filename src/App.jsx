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
      <About />
      <WaveDivider flip bgClass="bg-bg" fillClass="fill-bg-alt" />
      <Skills />
      <WaveDivider bgClass="bg-bg" fillClass="fill-bg-alt" />
      <Projects />
      <WaveDivider flip bgClass="bg-bg" fillClass="fill-bg-alt" />
      <Experience />
      <WaveDivider bgClass="bg-bg" fillClass="fill-bg-alt" />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
