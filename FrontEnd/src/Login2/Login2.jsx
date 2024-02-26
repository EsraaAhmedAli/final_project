import axios from "axios";
import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import Cookie from "cookie-universal";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import './Login2.css';
import '../components/pages/Dashboard/Dashboard';
import App from "../App";

const Login2 = () => {

  /* to disable the back button */
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };


  
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const cookie = Cookie();
  const [err, setErr] = useState("");



  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    const root = ReactDOM.createRoot(
      document.getElementById('root')
    );

    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post('http://localhost:3001/admin/login', {
        email: form.email,
        password: form.password,
      });

      


      setloading(false);
      const token = res.data;
      console.log(res);
      console.log(token);
      cookie.set("jwt", token);



      if (token){
        alert('Login Successfully');
        root.render(<App />);
      }
     


    } catch (err) {
      setloading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
        alert("Wrong Email or Password");
      } else {
        setErr("Internal Server Err");
        alert("Internal Server Error");
      }
    }

  }
  return (
    //   <div className="login">
    //   <section>

    //   <div className="register">

    // <div className="col-1">
    //     <div className="hhh"> <h1>Welcome !</h1></div>
    //     <form className="form" onSubmit={handleSubmit}>

    //     <h3 className="text1">Email </h3>

    //             <input  
    //               id="email"
    //               name="email"
    //               type="email"
    //               value={form.email}
    //               onChange={handleChange}
    //               placeholder='Example@gmail.com'/>



    //             <h4 className="text">password </h4>
    //             <input  
    //               id="password"
    //               name="password"
    //               type="password"
    //               value={form.password}
    //               onChange={handleChange}
    //               placeholder="Enter Your password ...."/>
    //                <div className="forgetpassword">  <h5>Forget Password ?</h5></div>

    //                <button className="btn"> Submit </button>
    //                {err!=="" && <span className="error">{err}</span>}


    //      </form>
    //      </div>
    //     <div className="col-2">
    //         {/* <img src={bgimg}  alt=""/> */}
    //     </div >

    //     </div>

    //     </section>
    //     </div> 

    <div className="log">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="lo">Login</h1>
          <div className="input-box">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder='Example@gmail.com' />
            <FaUser className="icon" />
          </div>


          <div className="input-box">

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Your password ...." />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <a href="#"> Forgot password? </a>
          </div>
          <button type="submit">LOGIN</button>

        </form>

      </div>
    </div>


  );
}
export default Login2;


