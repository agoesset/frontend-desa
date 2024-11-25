//import react
import { useState, useEffect } from "react";

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

//Create component in the same file
function SliderCreate({ fetchData }) {
  //state
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeSlider"
  const storeSlider = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);

    await Api.post("/api/admin/sliders", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //set input file to null
        document.getElementById("file").value = "";

        //fetch data
        fetchData();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">
        <h4 className="card-title">
          <i className="bi bi-image me-2"></i>
          Upload Slider Form
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={storeSlider}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {errors.image && (
              <div className="alert alert-danger mt-2">{errors.image[0]}</div>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-md btn-primary me-2">
              <i className="bi bi-upload"></i> Upload
            </button>
            <button type="reset" className="btn btn-md btn-warning">
              <i className="bi bi-arrow-clockwise"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SlidersIndex() {
  //title page
  document.title = "Sliders - Desa Digital";

  //define state "sliders"
  const [sliders, setSliders] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1) => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/sliders?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setSliders(response.data.data.data);
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    fetchData();
  }, []);

  //function "deleteSlider"
  const deleteSlider = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/sliders/${id}`, {
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
              <h3>Sliders</h3>
              <p className="text-subtitle text-muted">List all sliders.</p>
            </div>
          </div>
        </div>

        {hasAnyPermission(["sliders.create"]) && (
          <div className="mb-4">
            <SliderCreate fetchData={fetchData} />
          </div>
        )}

        <section className="section">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-center" style={{ width: "5%" }}>
                        No.
                      </th>
                      <th className="text-center">Image</th>
                      <th className="text-center" style={{ width: "15%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliders.length > 0 ? (
                      sliders.map((slider, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {++index +
                              (pagination.currentPage - 1) * pagination.perPage}
                          </td>
                          <td className="text-center">
                            <img
                              src={slider.image}
                              className="rounded"
                              width="300"
                              alt="slider"
                            />
                          </td>
                          <td className="text-center">
                            {hasAnyPermission(["sliders.delete"]) && (
                              <button
                                onClick={() => deleteSlider(slider.id)}
                                className="btn btn-sm btn-danger"
                                title="Delete"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>
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
                onChange={(pageNumber) => fetchData(pageNumber)}
                position="end"
              />
            </div>
          </div>
        </section>
      </div>

      <style>
        {`
          .table td {
            vertical-align: middle;
          }
        `}
      </style>
    </LayoutAdmin>
  );
}
