//import react
import { useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function AparatursCreate() {
  //title page
  document.title = "Create Aparatur - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //define state for form
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeAparatur"
  const storeAparatur = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("name", name);
    formData.append("role", role);

    try {
      //sending data
      const response = await Api.post("/api/admin/aparaturs", formData, {
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

      //redirect
      navigate("/admin/aparaturs");
    } catch (error) {
      //set error message to state "errors"
      setErros(error.response.data);
    }
  };

  return (
    <LayoutAdmin>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Create Aparatur</h3>
              <p className="text-subtitle text-muted">Add new aparatur data.</p>
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
                    <Link to="/admin/aparaturs">Aparaturs</Link>
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
                <i className="bi bi-person-plus"></i> Add New Aparatur
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={storeAparatur}>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Image <span className="text-danger">*</span>
                  </label>
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

                {image && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">Preview</label>
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Full Name"
                  />
                  {errors.name && (
                    <div className="alert alert-danger mt-2">
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Role <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter Role Name"
                  />
                  {errors.role && (
                    <div className="alert alert-danger mt-2">
                      {errors.role[0]}
                    </div>
                  )}
                </div>

                <div>
                  <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-save"></i> Save
                  </button>
                  <button type="reset" className="btn btn-warning me-2">
                    <i className="bi bi-arrow-clockwise"></i> Reset
                  </button>
                  <Link to="/admin/aparaturs" className="btn btn-secondary">
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
