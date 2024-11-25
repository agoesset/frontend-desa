//import sidebar
import Sidebar from "../components/admin/Sidebar";

//import navbar
import Navbar from "../components/admin/Navbar";

export default function admin({ children }) {
  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main" className="layout-navbar navbar-fixed">
          <Navbar />
          <div id="main-content">{children}</div>

          <footer>
            <div className="footer clearfix mb-0 text-muted">
              <div className="float-start">
                <p>2024 &copy; Desa Situraja</p>
              </div>
              <div className="float-end">
                <p>
                  Crafted with{" "}
                  <span className="text-danger">
                    <i className="bi bi-heart-fill icon-mid"></i>
                  </span>
                  &nbsp;by&nbsp;<a href="https://aguss.id">Agus</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
