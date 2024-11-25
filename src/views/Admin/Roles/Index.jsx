//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import toast
import toast from "react-hot-toast";

export default function RolesIndex() {
  //title page
  document.title = "Roles - Desa Digital";

  //define state "roles"
  const [roles, setRoles] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/roles?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setRoles"
      setRoles(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deleteRole"
  const deleteRole = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/roles/${id}`, {
              //header
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <LayoutAdmin>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Roles</h3>
              <p className="text-subtitle text-muted">
                List of all roles in the system.
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/admin/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Roles
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row">
                        {hasAnyPermission(["roles.create"]) && (
                          <div className="col-md-3 col-12 mb-2">
                            <Link
                              to="/admin/roles/create"
                              className="btn btn-md btn-primary border-0 shadow w-100"
                              type="button"
                            >
                              <i className="bi bi-plus-circle"></i> Add New
                            </Link>
                          </div>
                        )}
                        <div className="col-md-9 col-12 mb-2">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control border-0 shadow-sm"
                              value={keywords}
                              onChange={(e) => searchData(e)}
                              placeholder="search here..."
                            />
                            <button className="btn btn-primary" type="button">
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="text-center" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th>Role Name</th>
                          <th style={{ width: "60%" }}>Permissions</th>
                          <th className="text-center" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.length > 0 ? (
                          roles.map((role, index) => (
                            <tr key={index}>
                              <td className="text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{role.name}</td>
                              <td>
                                {role.permissions.map((permission, index) => (
                                  <span
                                    className="badge bg-warning me-2 mb-2"
                                    key={index}
                                  >
                                    {permission.name}
                                  </span>
                                ))}
                              </td>
                              <td className="text-center">
                                {hasAnyPermission(["roles.edit"]) && (
                                  <Link
                                    to={`/admin/roles/edit/${role.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["roles.delete"]) && (
                                  <button
                                    onClick={() => deleteRole(role.id)}
                                    className="btn btn-danger btn-sm"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>
                              <div className="alert alert-danger text-center mb-0">
                                Data Belum Tersedia!
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutAdmin>
  );
}
