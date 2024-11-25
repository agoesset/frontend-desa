import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function UsersEdit() {
  //title page
  document.title = "Edit User - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoles(response.data.data);
    });
  };

  //function "fetchDataUser"
  const fetchDataUser = async () => {
    await Api.get(`/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setRolesData(response.data.data.roles.map((obj) => obj.name));
    });
  };

  //useEffect
  useEffect(() => {
    fetchDataRoles();
    fetchDataUser();
  }, []);

  //define function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    let data = rolesData;

    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }

    setRolesData(data);
  };

  //function "updateUser"
  const updateUser = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/users/${id}`,
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        roles: rolesData,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigate("/admin/users");
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
              <h3>Edit User</h3>
              <p className="text-subtitle text-muted">
                Edit user data and modify roles.
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
              <h4 className="card-title">User Edit Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateUser}>
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
                      {errors.name && (
                        <div className="alert alert-danger mt-2">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>
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
                      {errors.email && (
                        <div className="alert alert-danger mt-2">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>
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
                      {errors.password && (
                        <div className="alert alert-danger mt-2">
                          {errors.password[0]}
                        </div>
                      )}
                    </div>
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
                                defaultChecked={rolesData.some(
                                  (name) => name === role.name
                                )}
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
                    <button type="submit" className="btn btn-primary me-2">
                      <i className="bi bi-save"></i> Update
                    </button>
                    <button type="reset" className="btn btn-warning">
                      <i className="bi bi-restart"></i> Reset
                    </button>
                    <Link to="/admin/users" className="btn btn-secondary ms-2">
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
