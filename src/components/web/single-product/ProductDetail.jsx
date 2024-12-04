import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import DOMPurify from "dompurify";

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailProduct = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/api/public/products/${slug}`);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, [slug]);

  if (loading) return <Loading />;
  if (!product) return null;

  const handleWhatsApp = () => {
    const text = `Halo, saya tertarik dengan produk ${product.title}`;
    window.open(
      `https://wa.me/${product.phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="product-description pb-3">
      {/* Header with Title and Back Button */}
      <div className="product-title-meta-data bg-white mb-3">
        <div className="container py-3">
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h5 className="mb-0">{product.title}</h5>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="product-gallery-wrapper bg-white mb-3">
        <div className="container py-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-100"
            style={{
              borderRadius: "8px",
              maxHeight: "400px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-specification bg-white mb-3">
        <div className="container py-3">
          <div className="mb-3">
            <strong>Pemilik:</strong>
            <p className="mb-2">{product.owner}</p>
          </div>

          <div className="mb-3">
            <h4 className="text-success fw-bold">
              {formatRupiah(product.price)}
            </h4>
          </div>

          <div className="mb-3">
            <strong>Alamat:</strong>
            <p className="mb-2">{product.address}</p>
          </div>

          <div className="mb-3">
            <strong>Deskripsi Produk:</strong>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.content),
              }}
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div
        className="cart-form-wrapper bg-white py-3"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <div className="container">
          <button onClick={handleWhatsApp} className="btn btn-success w-100">
            <i className="bi bi-whatsapp me-2"></i>
            Hubungi Penjual
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
