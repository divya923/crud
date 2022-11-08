import { useState } from "react";
import { useFormik } from "formik";

const App = () => {
  const [tableData, setTableData] = useState([]);

  const initialValues = {
    firstName: "",
    email: "",
    id: "",
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      id: "",
    },
    onSubmit: (values) => {
      // console.log(values)
      if (values.id == "") {
        let tableSize = tableData.length + 1;
        values.id = tableSize;
        setTableData([...tableData, values]);
        formik.setValues(initialValues);
      } else {
        const updatedTable = tableData.map((obj) => {
          if (obj.id == values.id) {
            return values;
          } else {
            return obj;
          }
        });
        setTableData([...updatedTable]);
        formik.setValues(initialValues);
      }
    },
  });

  const deleteData = (objId) => {
    const updatedData = tableData.filter((obj) => obj.id != objId);
    setTableData([...updatedData]);
  };

  const editData = (obj) => {
    formik.setValues(obj);
  };
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card m-3 p-3 shadow">
          <div className="card-header">User Form</div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </div>
              <input
                id="id"
                name="id"
                type="hidden"
                onChange={formik.handleChange}
                value={formik.values.id}
              />

              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer"></div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card m-4 p-2 shadow">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{obj.id}</th>
                      <td>{obj.firstName}</td>
                      <td>{obj.email}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            editData(obj);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteData(obj.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default App;
