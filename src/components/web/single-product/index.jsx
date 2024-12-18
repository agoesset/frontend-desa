import ProductSlider from "./ProductSlider";
import SingleProductArea from "./ProductDetail";
import HeaderTwo from "../../../layouts/web/HeaderTwo";
import Footer from "../../../layouts/web/Footer";

const SingleProduct = () => {
  return (
    <>
      <HeaderTwo links="shop-grid" title="Single Product" />
      <div className="page-content-wrapper">
        <ProductSlider />
        <SingleProductArea />
      </div>
      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default SingleProduct;
