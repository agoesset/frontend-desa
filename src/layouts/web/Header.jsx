import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Offcanvas from "../../components/web/common/Offcanvas";

const Header = ({ backButton = false, title = "" }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(!show);

  return (
    <div className="header-area" id="headerArea">
      <div className="container h-100">
        <div className="d-flex align-items-center justify-content-between h-100">
          {backButton ? (
            <>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-light btn-sm"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <h5 className="mb-0">{title}</h5>
              <div style={{ width: "40px" }}></div> {/* Spacer for alignment */}
            </>
          ) : (
            <>
              <div className="logo-wrapper">
                <a href="/">
                  <img
                    src="/images/situraja.svg"
                    style={{ width: "150px" }}
                    alt="Situraja"
                  />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <Offcanvas handleShow={handleShow} show={show} />
    </div>
  );
};

export default Header;
