import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">App details</h6>
        </div>
      </div>
      <div className="card-body text-center fs-1">
        <h1>
        CRUD for product with validation
        </h1>
        <Link className="btn btn-primary small-margin" to="/product">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Products</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
