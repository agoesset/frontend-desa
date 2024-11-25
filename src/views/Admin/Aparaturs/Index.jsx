//import react
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

export default function AparatursIndex() {
  //title page
  document.title = "Aparaturs - Desa Digital";

  //define state "aparaturs"
  const [aparaturs, setAparaturs] = useState([]);

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
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/aparaturs?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setAparaturs"
      setAparaturs(response.data.data.data);

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
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  //function "deleteAparatur"
  const deleteAparatur = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/aparaturs/${id}`, {
              headers: {
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
              <h3>Aparaturs</h3>
              <p className="text-subtitle text-muted">
                List all aparaturs data.
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
                    Aparaturs
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    {hasAnyPermission(["aparaturs.create"]) && (
                      <div className="col-md-3 col-12 mb-2">
                        <Link
                          to="/admin/aparaturs/create"
                          className="btn btn-md btn-primary"
                        >
                          <i className="bi bi-plus-circle"></i> Add New
                        </Link>
                      </div>
                    )}
                    <div className="col-md-9 col-12 mb-2">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={keywords}
                          onChange={(e) => searchData(e)}
                          placeholder="Search here..."
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
                <table className="table table-hover table-bordered mb-0">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "5%" }}>
                        No.
                      </th>
                      <th className="text-center">Image</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th className="text-center" style={{ width: "15%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {aparaturs.length > 0 ? (
                      aparaturs.map((aparatur, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index +
                              (pagination.currentPage - 1) * pagination.perPage}
                          </td>
                          <td className="text-center">
                            <img
                              src={aparatur.image}
                              className="rounded"
                              width="50"
                              alt={aparatur.name}
                            />
                          </td>
                          <td>{aparatur.name}</td>
                          <td>{aparatur.role}</td>
                          <td className="text-center">
                            {hasAnyPermission(["aparaturs.edit"]) && (
                              <Link
                                to={`/admin/aparaturs/edit/${aparatur.id}`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                            )}

                            {hasAnyPermission(["aparaturs.delete"]) && (
                              <button
                                onClick={() => deleteAparatur(aparatur.id)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>
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
        </section>
      </div>
    </LayoutAdmin>
  );
}
