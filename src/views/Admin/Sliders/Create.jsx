//import hook useState from react
import { useState } from "react";

//import react router dom
import { Link } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function SlidersCreate() {
  //title page
  document.title = "Create Slider - Desa Digital";

  //state
  const [image, setImage] = useState("");

  //state errors
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeSlider"
  const storeSlider = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);

    try {
      const response = await Api.post("/api/admin/sliders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      //show toast
      toast.success(response.data.message, {
        position: "top-right",
        duration: 4000,
      });

      //set input file to null
      document.getElementById("file").value = "";

      //redirect
      navigate("/admin/sliders");
    } catch (error) {
      setErros(error.response.data);
    }
  };

  return (
    <LayoutAdmin>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Create Slider</h3>
              <p className="text-subtitle text-muted">
                Upload new slider image.
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
                    <Link to="/admin/sliders">Sliders</Link>
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
                <i className="bi bi-image"></i> Upload Slider
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={storeSlider}>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Image <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="form-text">
                    Recommended image resolution: 1920x1080px
                  </div>
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>

                {image && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">Preview</label>
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-upload"></i> Upload
                  </button>
                  <button type="reset" className="btn btn-warning me-2">
                    <i className="bi bi-arrow-clockwise"></i> Reset
                  </button>
                  <Link to="/admin/sliders" className="btn btn-secondary">
                    <i className="bi bi-arrow-left"></i> Back
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
