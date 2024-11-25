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

export default function UsersCreate() {
  //title page
  document.title = "Create User - Desa Digital";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErros] = useState([]);

  //define state "roles"
  const [roles, setRoles] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataRoles"
  const fetchDataRoles = async () => {
    await Api.get("/api/admin/roles/all", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "roles"
      setRoles(response.data.data);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataRoles"
    fetchDataRoles();
  }, []);

  //function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //define data
    let data = rolesData;

    //push data on state
    data.push(e.target.value);

    //set data to state
    setRolesData(data);
  };

  //function "storeUser"
  const storeUser = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      "/api/admin/users",
      {
        //data
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        roles: rolesData,
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
        navigate("/admin/users");
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
              <h3>Create User</h3>
              <p className="text-subtitle text-muted">
                Create new user and assign roles.
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
                    <Link to="/admin/users">Users</Link>
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
              <h4 className="card-title">User Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={storeUser}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Full Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger mt-2">
                        {errors.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-bold">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                      />
                    </div>
                    {errors.email && (
                      <div className="alert alert-danger mt-2">
                        {errors.email[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-bold">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
                    </div>
                    {errors.password && (
                      <div className="alert alert-danger mt-2">
                        {errors.password[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-bold">
                        Password Confirmation
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        placeholder="Enter Password Confirmation"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label fw-bold mb-3">Roles</label>
                      <div className="row">
                        {roles.map((role) => (
                          <div className="col-md-3 mb-3" key={role.id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={role.name}
                                onChange={handleCheckboxChange}
                                id={`check-${role.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`check-${role.id}`}
                              >
                                {role.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.roles && (
                        <div className="alert alert-danger mt-2">
                          {errors.roles[0]}
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
                      to="/admin/users"
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
