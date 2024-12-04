import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";
import DOMPurify from "dompurify";

const PageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPage = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/api/public/pages/${slug}`);
      console.log("Page Data:", response.data.data); // Debugging
      setPage(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching page:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [slug]);

  if (loading) return <Loading />;
  if (!page) return null;

  return (
    <div className="product-description pb-3">
      {/* Header */}
      <div className="product-title-meta-data bg-white mb-3">
        <div className="container">
          <div className="d-flex align-items-center gap-3 py-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h5 className="mb-0">{page.title}</h5>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        {page.image && (
          <div className="bg-white p-3 rounded mb-3">
            <img
              src={`https://desa-api.aguss.id/storage/pages/${page.image}`}
              alt={page.title}
              className="w-100 rounded mb-3"
              style={{
                maxHeight: "400px",
                objectFit: "cover",
              }}
              onError={(e) => {
                console.log("Image failed to load:", e);
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="bg-white p-3 rounded">
          <div
            className="page-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page.content),
            }}
          />
        </div>
      </div>

      <Footer />

      <style>{`
        .page-content {
          color: #333;
          line-height: 1.6;
        }
        .page-content p {
          margin-bottom: 1rem;
        }
        .page-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

export default PageDetail;
