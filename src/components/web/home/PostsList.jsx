import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import moment from "moment";
import "moment/locale/id";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchDataPosts = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/posts");
      setPosts(response.data.data.data);
      setNextPageURL(response.data.data.next_page_url);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageURL || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await Api.get(nextPageURL);
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.data]);
      setNextPageURL(response.data.data.next_page_url);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="weekly-best-seller-area py-3">
      <div className="container">
        <div className="section-heading d-flex align-items-center justify-content-between">
          <h6 className="d-flex align-items-center">
            <i className="bi bi-newspaper me-2"></i>
            Berita Desa
          </h6>
          <Link className="btn btn-sm btn-light" to="/posts">
            Lihat Semua<i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

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
                          loading="lazy"
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

          {loadingMore && <Loading />}

          {nextPageURL && !loadingMore && (
            <div className="text-center mt-4">
              <button className="btn btn-light" onClick={loadMore}>
                Lihat Lainnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
