import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Navbar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get("user"));

  // Function to toggle sidebar
  const sidebarToggleHandler = (e) => {
    e.preventDefault();
    setSidebarToggle(!sidebarToggle);
  };

  // Function to close sidebar
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  // Effect to handle sidebar classes
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("backdrop");

    if (sidebarToggle) {
      sidebar?.classList.add("active");
      backdrop?.classList.add("sidebar-backdrop");
    } else {
      sidebar?.classList.remove("active");
      backdrop?.classList.remove("sidebar-backdrop");
    }
  }, [sidebarToggle]);

  // Effect to handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const burgerBtn = document.getElementById("sidebarCollapse");

      if (
        sidebarToggle &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !burgerBtn.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarToggle]);

  const logout = async (e) => {
    e.preventDefault();

    try {
      await Api.post("/api/logout");
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permissions");

      toast.success("Logout berhasil!", {
        position: "top-right",
        duration: 4000,
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Terjadi kesalahan saat logout");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand navbar-light navbar-top">
        <div className="container-fluid">
          {/* Burger button - only visible on mobile */}
          <a
            id="sidebarCollapse"
            href="#"
            onClick={sidebarToggleHandler}
            className="burger-btn d-block d-lg-none"
          >
            <i className="bi bi-justify fs-3"></i>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-lg-0"></ul>
            <div className="dropdown">
              <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="user-menu d-flex">
                  <div className="user-name text-end me-3">
                    <h6 className="mb-0 text-gray-600">{user.name}</h6>
                    <p className="mb-0 text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="user-img d-flex align-items-center">
                    <div className="avatar avatar-md">
                      <img src="/admin/compiled/jpg/1.jpg" alt="User Avatar" />
                    </div>
                  </div>
                </div>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ minWidth: "11rem" }}
              >
                <li>
                  <h6 className="dropdown-header">Hello, {user.name}</h6>
                </li>
                <li>
                  <Link onClick={logout} className="dropdown-item" to="#">
                    <i className="icon-mid bi bi-box-arrow-left me-2"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
