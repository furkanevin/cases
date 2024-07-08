import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Table from './components/Table';
import Activities from './components/Activities';
import GetStarted from './components/GetStarted';
import Startup from './components/Startup';

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen text-black">
        <Hero />
        <Table />
        <Activities />
        <GetStarted />
        <Startup />
      </div>
      <Footer />
    </>
  );
}
