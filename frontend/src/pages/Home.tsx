import Brands from "../components/home/Brands";
import CurratedPicks from "../components/home/CurratedPicks";
import DisplayText from "../components/home/DisplayText";
import Hero from "../components/home/Hero";

const Home = () => {

  return (
    <div className="app-container">
      <Hero />
      <Brands />
      <DisplayText />
      <CurratedPicks />
    </div>
  );
};

export default Home;
