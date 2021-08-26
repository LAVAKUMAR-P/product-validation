import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Editproduct(props) {
  //get the data from DB using Id
  //populate in form
  // update in db

  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const formik=useFormik({
    initialValues:{
      productName:"",
      price:"",
    },
    validate: (values) => {
      const errors = {};
      if (!values.productName || !values.price) {
        errors.productName = "Required";
        errors.price = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`https://60efffc8f587af00179d3c3b.mockapi.io/product/${props.match.params.id}`,   {
          productName: values.productName,
          price: values.price,
        });
        history.push("/product");
        setLoading(true);
      } catch (err) {
        alert("Failed to update")
        setLoading(false);
      }
    }

  })


  useEffect(() => {
    let fetchData = async () => {
      try {
        let product = await axios.get(
          `https://60efffc8f587af00179d3c3b.mockapi.io/product/${props.match.params.id}`
        );
        formik.setFieldValue("productName", product.data.productName);
        formik.setFieldValue("price", product.data.price);
      } catch (error) {
        window.alert(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
  <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Edit product</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="productName">product name</label>
            <input
              id="productName"
              value={formik.values.productName}
              type="text"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.touched.productName ? (
              <span className="text-danger">{formik.errors.productName}</span>
            ) : null}
          </div>
          <div className="col-lg-6">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              value={formik.values.price}
              type="text"
              onChange={formik.handleChange}
              className="form-control"
            />
             {formik.touched.price ? (
              <span className="text-danger">{formik.errors.price}</span>
            ) : null}
          </div>
          <div className="col-lg-12">
            <input
              type="submit"
              value="Update"
              className="btn btn-primary mt-3"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Editproduct;
