import { useState, useEffect, useRef } from "react"; // tambahkan useRef
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../assets/styles.css";

export default function PostsEdit() {
  //title page
  document.title = "Edit Post - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  // quill ref
  const quillRef = useRef();

  //define state for form
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErros] = useState([]);
  const [categories, setCategories] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  // define modules for Quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  // define formats
  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
  ];

  //function "fetchDataCategories"
  const fetchDataCategories = async () => {
    await Api.get("/api/admin/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data.data);
    });
  };

  //function "fetchDataPost"
  const fetchDataPost = async () => {
    await Api.get(`/api/admin/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setCategoryID(response.data.data.category_id);
      setContent(response.data.data.content);
    });
  };

  //useEffect
  useEffect(() => {
    fetchDataCategories();
    fetchDataPost();
  }, []);

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", categoryID);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/posts/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigate("/admin/posts");
      })
      .catch((error) => {
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Edit Post</h3>
              <p className="text-subtitle text-muted">
                Update existing post data.
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/admin/posts">Posts</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Post Edit Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label fw-bold">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      {errors.image && (
                        <div className="alert alert-danger mt-2">
                          {errors.image[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group mt-3">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Post"
                      />
                      {errors.title && (
                        <div className="alert alert-danger mt-2">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group mt-3">
                      <label className="form-label fw-bold">Category</label>
                      <select
                        className="form-select"
                        value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category_id && (
                        <div className="alert alert-danger mt-2">
                          {errors.category_id[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group mt-3">
                      <label className="form-label fw-bold">Content</label>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={(content) => setContent(content)}
                        style={{ minHeight: "200px" }}
                      />
                      {errors.content && (
                        <div className="alert alert-danger mt-2">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary me-2">
                      <i className="bi bi-save"></i> Update
                    </button>
                    <button type="reset" className="btn btn-warning me-2">
                      <i className="bi bi-restart"></i> Reset
                    </button>
                    <Link to="/admin/posts" className="btn btn-secondary">
                      <i className="bi bi-arrow-left"></i> Back
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      <style>
        {`
          .ql-container {
            min-height: 200px;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }

          .ql-toolbar {
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          }

          .ql-editor {
            min-height: 200px;
          }
        `}
      </style>
    </LayoutAdmin>
  );
}
