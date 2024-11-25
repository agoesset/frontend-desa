import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../assets/styles.css";

export default function ProductsCreate() {
  //title page
  document.title = "Create Product - Desa Digital";

  //navigate
  const navigate = useNavigate();

  // quill ref
  const quillRef = useRef();

  //define state for form
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPrice(value);
  };

  //function "storeProduct"
  const storeProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("owner", owner);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("content", content);

    await Api.post("/api/admin/products", formData, {
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
        navigate("/admin/products");
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
              <h3>Create Product</h3>
              <p className="text-subtitle text-muted">Add new product data.</p>
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
                    <Link to="/admin/products">Products</Link>
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
                <i className="bi bi-plus-circle me-2"></i>
                Product Create Form
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={storeProduct}>
                <div className="form-group mb-4">
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

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Product"
                      />
                      {errors.title && (
                        <div className="alert alert-danger mt-2">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone"
                      />
                      {errors.phone && (
                        <div className="alert alert-danger mt-2">
                          {errors.phone[0]}
                        </div>
                      )}
                    </div>
                  </div>
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

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Owner</label>
                      <input
                        type="text"
                        className="form-control"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="Enter Owner Product"
                      />
                      {errors.owner && (
                        <div className="alert alert-danger mt-2">
                          {errors.owner[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        value={new Intl.NumberFormat("id-ID").format(price)}
                        onChange={handlePriceChange}
                        placeholder="Enter Price Product"
                      />

                      {errors.price && (
                        <div className="alert alert-danger mt-2">
                          {errors.price[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label fw-bold">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                  ></textarea>
                  {errors.address && (
                    <div className="alert alert-danger mt-2">
                      {errors.address[0]}
                    </div>
                  )}
                </div>

                <div>
                  <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-save me-2"></i>
                    Save
                  </button>
                  <button type="reset" className="btn btn-warning me-2">
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset
                  </button>
                  <Link to="/admin/products" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </LayoutAdmin>
  );
}
