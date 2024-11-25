//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import Link
import { Link } from "react-router-dom";

export default function Dashboard() {
  //title page
  document.title = "Dashboard - Desa Digital";
  //init state
  const [countCategories, setCountCategories] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countAparaturs, setCountAparaturs] = useState(0);

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setCountCategories(response.data.data.categories);
      setCountPosts(response.data.data.posts);
      setCountProducts(response.data.data.products);
      setCountAparaturs(response.data.data.aparaturs);
    });
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <div className="row">
              <div className="col-6 col-lg-3 col-md-6">
                <Link to={"admin/categories"} className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                        <div className="stats-icon purple mb-2">
                          <i className="iconly-boldShow"></i>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Categories</h6>
                        <h6 className="font-extrabold mb-0">
                          {countCategories}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <Link to={"admin/posts"} className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                        <div className="stats-icon blue mb-2">
                          <i className="iconly-boldProfile"></i>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Posts</h6>
                        <h6 className="font-extrabold mb-0">{countPosts}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <Link to={"admin/products"} className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                        <div className="stats-icon green mb-2">
                          <i className="iconly-boldAdd-User"></i>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Products</h6>
                        <h6 className="font-extrabold mb-0">{countProducts}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <Link to={"admin/aparaturs"} className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                        <div className="stats-icon red mb-2">
                          <i className="iconly-boldBookmark"></i>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Aparaturs</h6>
                        <h6 className="font-extrabold mb-0">
                          {countAparaturs}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutAdmin>
  );
}
