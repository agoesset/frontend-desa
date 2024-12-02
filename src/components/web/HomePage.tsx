import Alert from "./common/Alert";
import CtaArea from "./home/CtaArea";
import ProductSection from "./home/ProductSection";
import HeroSlider from "./home/HeroSlider";
import DarkLight from "./common/DarkLight";
import DiscountCouponCard from "./home/DiscountCouponCard";
import FeaturedProducts from "./home/FeaturedProducts";
import Collections from "./home/Collections";
import Header from "../../layouts/web/Header";
import Footer from "../../layouts/web/Footer";
import PostsList from "./home/PostsList";

const HomePage = () => {
  return (
    <>
      <Header />
      <Alert />
      <div className="page-content-wrapper">
        <HeroSlider />
        <ProductSection />
        <DarkLight />
        <PostsList />
        {/*<DiscountCouponCard />
        <FeaturedProducts />
        <Collections /> */}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
