import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";

const Pages = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/pages");
      setPages(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="product-description pb-3">
      {/* Header */}
      <div className="product-title-meta-data bg-white mb-2">
        <div className="container">
          <div className="d-flex align-items-center gap-3 py-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h5 className="mb-0">Tentang Desa</h5>
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="row g-2">
            {pages.map((page) => (
              <div key={page.id} className="col-12">
                <Link
                  to={`/pages/${page.slug}`}
                  className="text-decoration-none"
                >
                  <div className="card">
                    <div className="card-body d-flex align-items-center px-4 py-3">
                      <h6 className="mb-0 text-dark flex-grow-1">
                        {page.title}
                      </h6>
                      <i className="bi bi-chevron-right text-muted"></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Pages;
