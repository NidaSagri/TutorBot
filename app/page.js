import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/>
      <Footer/>
    </div>
    
  );
}
