import Brands from "../components/home/Brands";
import CurratedPicks from "../components/home/CurratedPicks";
import DisplayText from "../components/home/DisplayText";
import Hero from "../components/home/Hero";
import SelectedProducts from "../components/home/FeaturedProducts";
import NewsLetter from "../components/home/NewsLetter";

const Home = () => {

  return (
    <div className="app-container">
      <Hero />
      <Brands />
      <DisplayText />
      <CurratedPicks />
      <SelectedProducts />
      <NewsLetter newsletter_extras={'s-480:pb-20 pb-10 s-1025:px-[80px] s-767:px-[40px] px-[16px] s-767:pt-[144px] pt-[50px]'} />
    </div>
  );
};

export default Home;
