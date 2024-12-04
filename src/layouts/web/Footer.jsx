import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-nav-area" id="footerNav">
      <div className="suha-footer-nav">
        <ul className="h-100 d-flex align-items-center justify-content-between ps-0 d-flex rtl-flex-d-row-r">
          <li>
            <Link to="/" className="d-flex flex-column align-items-center">
              <i className="bi bi-house-door fs-5 mb-3"></i>
              <span className="small">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/posts" className="d-flex flex-column align-items-center">
              <i className="bi bi-newspaper fs-5 mb-3"></i>
              <span className="small">Berita</span>
            </Link>
          </li>
          <li>
            <Link to="/pages" className="d-flex flex-column align-items-center">
              <i className="bi bi-info-circle fs-5 mb-3"></i>
              <span className="small">Info</span>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="d-flex flex-column align-items-center"
            >
              <i className="bi bi-shop fs-5 mb-3"></i>
              <span className="small">Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/photos"
              className="d-flex flex-column align-items-center"
            >
              <i className="bi bi-images fs-5 mb-3"></i>
              <span className="small">Galeri</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
