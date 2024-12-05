import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";

const Photos = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/photos");
      setPhotos(response.data.data.data);
      setNextPageURL(response.data.data.next_page_url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageURL || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await Api.get(nextPageURL);
      setPhotos([...photos, ...response.data.data.data]);
      setNextPageURL(response.data.data.next_page_url);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error loading more photos:", error);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
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
            <h5 className="mb-0">Galeri Foto</h5>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="container px-3">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row g-3">
              {photos.map((photo) => (
                <div key={photo.id} className="col-6">
                  <div className="card">
                    <div className="card-body p-2">
                      <div className="d-block">
                        <img
                          src={photo.image}
                          alt={photo.caption}
                          className="w-100 rounded"
                          style={{
                            height: "180px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      {photo.caption && (
                        <h6
                          className="mt-2 px-1"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: "3rem",
                            height: "3em",
                          }}
                        >
                          {photo.caption}
                        </h6>
                      )}
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

export default Photos;
