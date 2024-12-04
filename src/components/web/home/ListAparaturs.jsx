import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../services/Api";

const Aparaturs = () => {
  const navigate = useNavigate();
  const [aparaturs, setAparaturs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAparaturs = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/aparaturs");
      setAparaturs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching aparaturs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAparaturs();
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
            <h5 className="mb-0">Aparatur Desa</h5>
          </div>
        </div>
      </div>

      {/* Aparaturs Grid */}
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="row g-2">
            {aparaturs.map((aparatur) => (
              <div key={aparatur.id} className="col-6">
                <div className="card h-100">
                  <div className="card-body p-3">
                    <img
                      src={`https://desa-api.aguss.id/storage/aparaturs/${aparatur.image}`}
                      alt={aparatur.name}
                      className="w-100 rounded mb-3"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="border-top pt-3 text-center">
                      <h6 className="mb-1">{aparatur.name}</h6>
                      <p className="text-muted small mb-0 fst-italic">
                        {aparatur.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Aparaturs;
