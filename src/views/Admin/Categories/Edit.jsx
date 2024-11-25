import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function CategoryEdit() {
  //title page
  document.title = "Edit Category - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function fetchDataCategory
  const fetchDataCategory = async () => {
    await Api.get(`/api/admin/categories/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataCategory"
    fetchDataCategory();
  }, []);

  //function "updateCategory"
  const updateCategory = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/categories/${id}`,
      {
        //data
        name: name,
        _method: "PUT",
      },
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/categories");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Edit Category</h3>
              <p className="text-subtitle text-muted">
                Update existing category data.
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
                    <Link to="/admin/categories">Categories</Link>
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
              <h4 className="card-title">Category Edit Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateCategory}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label fw-bold">
                        Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Category Name"
                      />
                      {errors.name && (
                        <div className="alert alert-danger mt-2">
                          {errors.name[0]}
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
                    <Link to="/admin/categories" className="btn btn-secondary">
                      <i className="bi bi-arrow-left"></i> Back
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
