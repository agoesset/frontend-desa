import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/products");
      setProducts(response.data.data.data);
      setNextPageURL(response.data.data.next_page_url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageURL || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await Api.get(nextPageURL);
      setProducts([...products, ...response.data.data.data]);
      setNextPageURL(response.data.data.next_page_url);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error loading more products:", error);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-description pb-3">
      {/* Header */}
      <div className="product-title-meta-data bg-white mb-3">
        <div className="container px-3">
          <div className="d-flex align-items-center gap-3 py-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h5 className="mb-0">Produk Desa</h5>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="container px-3">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row g-3">
              {products.map((product) => (
                <div key={product.id} className="col-6">
                  <div className="card product-card">
                    <div className="card-body d-flex flex-column">
                      <Link
                        className="product-thumbnail d-block"
                        to={`/products/${product.slug}`}
                      >
                        <img
                          className="mb-2 w-100"
                          src={product.image}
                          alt={product.title}
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Link>

                      <div className="d-flex flex-column flex-grow-1">
                        <Link
                          className="product-title d-block"
                          to={`/products/${product.slug}`}
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: "1.5",
                            height: "3em",
                          }}
                        >
                          {product.title}
                        </Link>

                        <div className="01">
                          <p className="sale-price fw-bold text-success">
                            {formatRupiah(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loadingMore && <Loading />}

            {nextPageURL && !loadingMore && (
              <div className="text-center mt-4 mb-3">
                <button className="btn btn-light" onClick={loadMore}>
                  Lihat Lainnya
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
