//import react
import { useState, useEffect } from "react";

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

export default function RolesCreate() {
  //title page
  document.title = "Create Role - Desa Digital";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [name, setName] = useState("");
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErros] = useState([]);

  //define state "permissions"
  const [permissions, setPermissions] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataPermissions"
  const fetchDataPermissions = async () => {
    await Api.get("/api/admin/permissions/all", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "permissions"
      setPermissions(response.data.data);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPermissions"
    fetchDataPermissions();
  }, []);

  //function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //define data
    let data = permissionsData;

    //push data on state
    data.push(e.target.value);

    //set data to state
    setPermissionsData(data);
  };

  //function "storeRole"
  const storeRole = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      "/api/admin/roles",
      {
        //data
        name: name,
        permissions: permissionsData,
      },
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
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
        navigate("/admin/roles");
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
              <h3>Create Role</h3>
              <p className="text-subtitle text-muted">
                Create new role and assign permissions.
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
                    <Link to="/admin/roles">Roles</Link>
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
              <h4 className="card-title">Role Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={storeRole}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-bold">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Role Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger mt-2">
                        {errors.name[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label fw-bold mb-3">
                        Permissions
                      </label>
                      <div className="row">
                        {permissions.map((permission) => (
                          <div className="col-md-3 mb-3" key={permission.id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={permission.name}
                                onChange={handleCheckboxChange}
                                id={`check-${permission.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`check-${permission.id}`}
                              >
                                {permission.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.permissions && (
                        <div className="alert alert-danger mt-2">
                          {errors.permissions[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-md btn-primary me-2"
                    >
                      <i className="bi bi-save"></i> Save
                    </button>
                    <button type="reset" className="btn btn-md btn-warning">
                      <i className="bi bi-restart"></i> Reset
                    </button>
                    <Link
                      to="/admin/roles"
                      className="btn btn-md btn-secondary ms-2"
                    >
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
