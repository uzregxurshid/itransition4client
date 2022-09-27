import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState(null);
  const [pass, setPass] = useState(null);


  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + 'admin', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>
      {
        navigate('/panel')
      }
    ).catch(err=>{
      localStorage.clear();
    })
  }, [navigate])

  const handleSubmit = ()=>{
    var data = JSON.stringify({
      "email": email,
      "password": pass
    });
    
    var config = {
      method: 'post',
      url: process.env.REACT_APP_URL+'login',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      localStorage.setItem('token', response.data)
      navigate('/panel')
    })
    .catch(function (error) {
      console.log(error);
      
    });
  }

  return (
    <>
      <section className="vh-100" style={{
        backgroundColor: "#eee"
      }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form className="mx-1 mx-md-4">

                   

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" onChange={e=>setEmail(e.target.value)} />
                            <label className="form-label" htmlFor ="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control"  onChange={e=>setPass(e.target.value)}/>
                            <label className="form-label" htmlFor ="form3Example4c">Password</label>
                          </div>
                        </div>

                    

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample img" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register