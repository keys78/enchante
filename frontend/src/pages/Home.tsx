import Brands from "../components/home/Brands";
import CurratedPicks from "../components/home/CurratedPicks";
import DisplayText from "../components/home/DisplayText";
// import Hero from "../components/home/Hero";
import SelectedProducts from "../components/home/FeaturedProducts";
import NewsLetter from "../components/home/NewsLetter";

const Home = () => {

  return (
    <div className="app-container">
      {/* <Hero /> */}
      <Brands />
      <DisplayText />
      <CurratedPicks />
      <SelectedProducts />
      <NewsLetter />
    </div>
  );
};

export default Home;
