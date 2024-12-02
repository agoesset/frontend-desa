import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";

// Import Swiper styles
import "swiper/css";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataProducts = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/products_home");
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flash-sale-wrapper py-3">
      <div className="container">
        <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
          <h6 className="d-flex align-items-center rtl-flex-d-row-r">
            <i className="bi bi-shop me-2"></i>Produk Desa
          </h6>
        </div>

        {products.length > 0 ? (
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="flash-sale-slide"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="card flash-sale-card">
                <div className="card-body">
                  <a href={`/product/${product.slug}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="mb-2 w-100"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <span className="product-title d-block mb-1">
                      {product.title}
                    </span>
                    <p className="sale-price mb-0">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted"></i>
            <p className="mt-2 text-muted">Tidak ada produk</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
