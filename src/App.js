import React, { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
 
  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      name: name,
      email: email
    }
    axios.put('https://reqres.in/api/users/2', data).then(res => {
      setData(res.data);
      setName('');
      setEmail('');
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
 
  return (
    <div className="container p-3">
      <h5 className="d-inline-block mb-3">Update User Details</h5>
      <div style={{ maxWidth: 350 }}>
        <div classNames="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div classNames="form-group">
          <label htmlFor="email" className="mt-2">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >{loading ? 'Loading...' : 'Update'}</button>
        {data && <div className="mt-3">
          <strong>Output:</strong><br />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        }
      </div>
    </div>
  );
}
 
export default App;