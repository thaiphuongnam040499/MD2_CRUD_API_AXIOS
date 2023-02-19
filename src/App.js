import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [list, setList] = useState([])
  const [student, setStudent] = useState({
    id: "",
    name: "",
    country: "",
    comment: ""
  })
  const handleChange = (e) => {
    let name = e.target.name
    setStudent({ ...student, [name]: e.target.value })
  }
  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then((res) => setList(res.data))
      .catch((err) => console.log(err))
  }, [])
  const handleSubmit = () => {
    axios.post("http://localhost:3001/users", student)
      .then((res) => setList(res.data))
      .catch((err) => console.log(err))
  }
  const handleDelete = (idDel, index) => {
    axios.delete(`http://localhost:3001/users/${idDel}`)
      .then(() => {
        let newList = [...list]
        newList.splice(index, 1)
        return setList(newList)
      })

  }
  const handleEdit = (val) => {
    setStudent({
      id: val.id,
      name: val.name,
      country: val.country,
      comment: val.comment
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="col-5 grid-margin">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">CRUD operation with json sever</h3>
              <form className="form-sample">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">ID</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      name='id'
                      value={student.id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name='name'
                      value={student.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Country</label>
                  <div className="col-sm-9">
                    <select
                      name='country'
                      value={student.country}
                      onChange={handleChange}
                    >
                      <option value={"HN"}>Hà Nội</option>
                      <option value={"HCM"}>TP. Hồ Chí Minh</option>
                      <option value={"ĐN"}>Đà Nẵng</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Comment</label>
                  <div className="col-sm-9">
                    <textarea
                      name='comment'
                      value={student.comment}
                      onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <button className='btn btn-info my-2' onClick={handleSubmit}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table border={1} className="table table-striped table-primary my-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Comment</th>
              <th colSpan={2}>Option</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.country}</td>
                  <td>{item.comment}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id, index)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}
export default App;
