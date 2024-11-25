//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function RolesEdit() {
  //title page
  document.title = "Edit Role - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

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

  //function "fetchDataRole"
  const fetchDataRole = async () => {
    await Api.get(`/api/admin/roles/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
      setPermissionsData(response.data.data.permissions.map((obj) => obj.name));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPermissions"
    fetchDataPermissions();

    //call function "fetchDataRole"
    fetchDataRole();
  }, []);

  //define function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //create new array from current permissions
    let updatedPermissions = [...permissionsData];

    //check if permission already exists
    if (updatedPermissions.includes(e.target.value)) {
      //remove permission
      updatedPermissions = updatedPermissions.filter(
        (item) => item !== e.target.value
      );
    } else {
      //add permission
      updatedPermissions.push(e.target.value);
    }

    //update state with new array
    setPermissionsData(updatedPermissions);
  };

  //function "updateRole"
  const updateRole = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/roles/${id}`,
      {
        //data
        name: name,
        permissions: permissionsData,
        _method: "PUT",
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
              <h3>Edit Role</h3>
              <p className="text-subtitle text-muted">
                Edit role and modify permissions.
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
              <h4 className="card-title">Role Edit Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateRole}>
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
                                defaultChecked={permissionsData.some(
                                  //   (name) => name === permission.name ?? true
                                  (name) => name === permission.name
                                )}
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
                      <i className="bi bi-save"></i> Update
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
