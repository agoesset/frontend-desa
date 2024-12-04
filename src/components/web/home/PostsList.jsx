import React, { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const getNextData = async () => {
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
          <a className="btn btn-sm btn-light" href="/posts">
            Lihat Semua<i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>

        <div className="row g-2">
          {posts.map((post, index) => (
            <div key={post.id} className="col-12">
              <div className="card horizontal-product-card">
                <div className="d-flex align-items-center">
                  <div className="product-thumbnail-side">
                    <a
                      className="product-thumbnail d-block"
                      href={`/posts/${post.slug}`}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  </div>
                  <div className="product-description p-3">
                    <a
                      href={`/categories/${post.category?.slug}`}
                      className="mb-1 d-inline-block"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        textDecoration: "none",
                      }}
                    >
                      {post.category?.name || "Uncategorized"}
                    </a>
                    <a
                      className="product-title d-block mt-1"
                      href={`/posts/${post.slug}`}
                    >
                      {post.title}
                    </a>
                    <div className="d-flex align-items-center mt-2 text-secondary">
                      <small className="me-3">
                        <i className="bi bi-calendar2 me-1"></i>
                        {new Date(post.created_at).toLocaleDateString("id-ID")}
                      </small>
                      <small>
                        <i className="bi bi-person me-1"></i>
                        {post.user?.name || "Anonymous"}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loadingMore && <Loading />}

          {nextPageURL && !loadingMore && (
            <div className="text-center mt-3">
              <button className="btn btn-light btn-sm" onClick={getNextData}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
