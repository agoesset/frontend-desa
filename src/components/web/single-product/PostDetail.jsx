import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";
import Footer from "../../../layouts/web/Footer";
import DOMPurify from "dompurify";
import moment from "moment";
import "moment/locale/id";

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailPost = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/api/public/posts/${slug}`);
      setPost(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, [slug]);

  if (loading) return <Loading />;
  if (!post) return null;

  return (
    <div className="product-description pb-3">
      {/* Header with Back Button */}
      <div className="product-title-meta-data bg-white mb-3">
        <div className="container">
          <div className="d-flex align-items-center gap-3 py-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h5 className="mb-0">Detail Berita</h5>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="container">
        {/* Title */}
        <div className="bg-white p-3 mb-3 rounded">
          <h5 className="mb-3">{post.title}</h5>

          {/* Author and Date */}
          <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-person me-1"></i>
              <span>{post.user.name}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar me-1"></i>
              <span>{moment(post.created_at).format("LL")}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white p-3 mb-3 rounded">
          <img
            src={post.image}
            alt={post.title}
            className="w-100 rounded"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content */}
        <div className="bg-white p-3 rounded">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>
      </div>

      <Footer />

      {/* CSS untuk konten post */}
      <style>{`
        .post-content {
          color: #333;
          line-height: 1.6;
        }
        .post-content p {
          margin-bottom: 1rem;
        }
        .post-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

export default PostDetail;
