import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Panel = () => {
  const [id, setId] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + 'admin', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>
      {
        setData([...res.data])
      }
    ).catch(err=>{
      navigate('/login')
    })
    return () => {
    }
  }, [navigate]);
  const handleBlock = ()=>{
     axios.post(process.env.REACT_APP_URL+'block', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      id
     }).then(
      res=>
    {
      console.log(res);
      setData([...res.data])
    }
     ).catch((err)=>{
      console.log(err);
     })
  }

  const handleUnblock = ()=>{
    axios.post(process.env.REACT_APP_URL+'unblock', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      id
     }).then(
      res=>
    {
      console.log(res);
      setData([...res.data])
    }
     ).catch((err)=>{
      console.log(err);
     })
  }

  const handleDelete = ()=>{
    axios.post(process.env.REACT_APP_URL+'delete', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      id
     }).then(
      res=>
    {
      console.log(res);
      setData([...res.data])
    }
     ).catch((err)=>{
      console.log(err);
     })
  }

  return (
    <div className="content">
      <div className="container">
        <h2 className="mb-5">Table #1</h2>
        <button type="button" className="btn btn-warning" onClick={handleBlock}>Block</button>
        <button type="button" className="btn btn-primary mx-2" onClick={handleUnblock}>Unblock</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>

        <div className="table-responsive mt-5">
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">
                  <label className="control control--checkbox">
                    <div className="control__indicator"></div>
                  </label>
                </th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Registration time</th>
                <th scope="col">Last login time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                data&&data.map(item=>
                  <tr key={item.id}>
                  <th scope="row">
                    <label className="control control--checkbox">
                      <input type="checkbox" onClick={e=>{
                        console.log(id);
                        if(id.includes(item.id)){
                          setId(id.filter(i=>i!==item.id))
                        }else{
                          setId([...id,item.id])
                        }
                      }}/>
                      <div className="control__indicator"></div>
                    </label>
                  </th>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.registration_time}</td>
                  <td>{item.last_login_time}</td>
                  <td>{item.status===1?'Active':'Blocked'}</td>
                </tr>
                )
              }
           

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Panel