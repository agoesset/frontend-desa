//import Link from react router dom
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div id="error">
      <div className="error-page container">
        <div className="col-md-8 col-12 offset-md-2">
          <div className="text-center">
            <img
              className="img-error"
              src="admin/compiled/svg/error-403.svg"
              alt="Not Found"
            />
            <h1 className="error-title">Forbidden</h1>
            <p className="fs-5 text-gray-600">
              Anda Tidak Memiliki Hak untuk Mengakses Halaman ini.
            </p>
            <Link
              to="/dashboard"
              className="btn btn-lg btn-outline-primary mt-3"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
