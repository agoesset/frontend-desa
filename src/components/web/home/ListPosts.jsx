import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";
import moment from "moment";
import "moment/locale/id";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/posts");
      setPosts(response.data.data.data);
      setNextPageURL(response.data.data.next_page_url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageURL || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await Api.get(nextPageURL);
      setPosts([...posts, ...response.data.data.data]);
      setNextPageURL(response.data.data.next_page_url);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error loading more posts:", error);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
            <h5 className="mb-0">Berita Desa</h5>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row g-3">
              {posts.map((post) => (
                <div key={post.id} className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-4">
                          <Link to={`/posts/${post.slug}`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-100 rounded"
                              style={{
                                height: "120px",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                        </div>
                        <div className="col-8">
                          <Link
                            to={`/posts/${post.slug}`}
                            className="text-decoration-none"
                          >
                            <h6
                              className="mb-1 "
                              style={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: "1.5",
                              }}
                            >
                              {post.title}
                            </h6>
                          </Link>
                          <div className="d-flex gap-3 small text-secondary mt-2">
                            <div className="d-flex align-items-center gap-1">
                              <i className="bi bi-person"></i>
                              {post.user.name}
                            </div>
                            <div className="d-flex align-items-center gap-1 text-secondary">
                              <i className="bi bi-calendar"></i>
                              {moment(post.created_at).format("LL")}
                            </div>
                          </div>
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

export default Posts;
