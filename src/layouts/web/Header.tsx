"use client";
// import Offcanvas from "@/components/common/Offcanvas";
// import Link from "next/link";
import { useState } from "react";
import Offcanvas from "../../components/web/common/Offcanvas";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
          <div className="logo-wrapper">
            <a href="/home">
              <img
                src="/images/situraja.svg"
                style={{ width: "150px" }}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <Offcanvas handleShow={handleShow} show={show} />
    </>
  );
};

export default Header;
