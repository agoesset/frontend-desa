import ProductSection from "./home/ProductSection";
import HeroSlider from "./home/HeroSlider";
import DarkLight from "./common/DarkLight";
import Header from "../../layouts/web/Header";
import Footer from "../../layouts/web/Footer";
import PostsList from "./home/PostsList";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-content-wrapper">
        <HeroSlider />
        <ProductSection />
        <DarkLight />
        <PostsList />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
