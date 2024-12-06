import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import Loading from "../general/Loading";
import Footer from "../../layouts/web/Footer";

export default function CombinedPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pages");
  const [pages, setPages] = useState([]);
  const [aparaturs, setAparaturs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const response = await Api.get("/api/public/pages");
      setPages(response.data.data);
    } catch (error) {
      console.error("Failed to fetch pages data!", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAparaturs = async () => {
    try {
      const response = await Api.get("/api/public/aparaturs");
      setAparaturs(response.data.data);
    } catch (error) {
      console.error("Failed to fetch aparaturs data!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (activeTab === "pages") {
      fetchPages();
    } else {
      fetchAparaturs();
    }
  }, [activeTab]);

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
              <i className="bi bi-arrow-left text-secondary"></i>
            </button>
            <h5 className="mb-0">Pages & Aparatur</h5>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        {/* Tab Navigation */}
        <div className="nav-wrapper mb-3">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "pages" ? "active" : ""}`}
                onClick={() => setActiveTab("pages")}
              >
                <i className="bi bi-file-text me-2"></i>
                Pages
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "aparaturs" ? "active" : ""
                }`}
                onClick={() => setActiveTab("aparaturs")}
              >
                <i className="bi bi-people me-2"></i>
                Aparaturs
              </button>
            </li>
          </ul>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="tab-content">
            {/* Pages Content */}
            {activeTab === "pages" && (
              <div className="row g-3">
                {pages.map((page) => (
                  <div key={page.id} className="col-12">
                    <Link
                      to={`/pages/${page.slug}`}
                      className="text-decoration-none"
                    >
                      <div className="card">
                        <div className="card-body px-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-0 text-content">{page.title}</h6>
                            <i className="bi bi-chevron-right text-secondary"></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Aparaturs Content */}
            {activeTab === "aparaturs" && (
              <div className="row g-3">
                {aparaturs.map((aparatur) => (
                  <div key={aparatur.id} className="col-6 col-md-4 col-lg-4">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="user-profile mb-2">
                          <img
                            src={aparatur.image}
                            alt={aparatur.name}
                            style={{
                              width: "100%",
                              height: "160px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            loading="lazy"
                          />
                        </div>
                        <h6 className="mb-1 text-content">{aparatur.name}</h6>
                        <p className="mb-0 small text-secondary font-italic">
                          {aparatur.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
