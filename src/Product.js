import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Product() {
  const [prodList, setProdList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let fetchdata=async()=>{
    try {
      let products = await axios.get(
        "https://60efffc8f587af00179d3c3b.mockapi.io/product"
      );
      setProdList([...products.data]);
      setLoading(false);
    } catch (err) {
      window.alert("Check your network");
    }
  }
  fetchdata();
    // eslint-disable-next-line
  }, []);

  let handleDelete = async (id) => {
    try {
      let confirm = window.confirm("Are you want to delete?");
      if (confirm) {
        await axios.delete(
          `https://60efffc8f587af00179d3c3b.mockapi.io/product/${id}`
        );
        let rowIndex = prodList.findIndex((obj) => obj.id === id);
        prodList.splice(rowIndex, 1);
        setProdList([...prodList]);
      }
    } catch (err) {
      window.alert("check your Network");
    }
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">product</h1>
      <Link
        to="/creat-product"
        className="btn btn-sm btn-primary shadow-sm margin"
      >
        <i classNamen="fas fa-download fa-sm text-white-50"></i> Creat Poroduct
      </Link>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            DataTables Example
          </h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            {isLoading ? (
              <h3>Lodaing....</h3>
            ) : (
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {prodList.map((obj) => {
                    return (
                      <tr>
                        <td>{obj.id}</td>
                        <td>{obj.productName}</td>
                        <td>{obj.price}</td>
                        <td>
                          <Link
                            to={`/edit/product/${obj.id}`}
                            className="btn btn-sm btn-primary small-margin"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger small-margin"
                            onClick={() => {
                              handleDelete(obj.id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
