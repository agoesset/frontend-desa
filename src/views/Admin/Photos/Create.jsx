import { useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function PhotosCreate(props) {
  //state
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storePhoto"
  const storePhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    await Api.post("/api/admin/photos", formData, {
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

        //reset form
        setImage("");
        setCaption("");
        document.getElementById("file").value = "";

        //fetch data
        props.fetchData();
      })
      .catch((error) => {
        setErros(error.response.data);
      });
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Upload Photo</h3>
            <p className="text-subtitle text-muted">
              Add new photo to gallery.
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
                <li className="breadcrumb-item active" aria-current="page">
                  Photos
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
              <i className="bi bi-image me-2"></i>
              Upload Photo Form
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={storePhoto}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label className="form-label fw-bold">
                      Image
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      id="file"
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

                  <div className="form-group mb-4">
                    <label className="form-label fw-bold">
                      Caption
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Enter Photo Caption"
                    />
                    {errors.caption && (
                      <div className="alert alert-danger mt-2">
                        {errors.caption[0]}
                      </div>
                    )}
                  </div>

                  {image && (
                    <div className="form-group mb-4">
                      <label className="form-label fw-bold">Preview</label>
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="img-preview rounded"
                          style={{ maxWidth: "200px" }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <button type="submit" className="btn btn-primary me-2">
                      <i className="bi bi-upload me-2"></i>
                      Upload
                    </button>
                    <button type="reset" className="btn btn-warning me-2">
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Reset
                    </button>
                    <Link to="/admin/photos" className="btn btn-secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
