import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../assets/styles.css";

export default function PagesCreate() {
  //title page
  document.title = "Create Page - Desa Digital";

  //navigate
  const navigate = useNavigate();

  // quill ref
  const quillRef = useRef();

  //define state for form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErros] = useState([]);

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

  //function "storePage"
  const storePage = async (e) => {
    e.preventDefault();

    await Api.post(
      "/api/admin/pages",
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/admin/pages");
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
              <h3>Create Page</h3>
              <p className="text-subtitle text-muted">
                Create a new static page content.
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
                    <Link to="/admin/pages">Pages</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <i className="bi bi-pencil me-2"></i>
                Page Create Form
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={storePage}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Page"
                      />
                      {errors.title && (
                        <div className="alert alert-danger mt-2">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Content</label>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={(content) => setContent(content)}
                      />
                      {errors.content && (
                        <div className="alert alert-danger mt-2">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary me-2">
                      <i className="bi bi-save me-2"></i>
                      Save
                    </button>
                    <button type="reset" className="btn btn-warning me-2">
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Reset
                    </button>
                    <Link to="/admin/pages" className="btn btn-secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Back
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </LayoutAdmin>
  );
}
