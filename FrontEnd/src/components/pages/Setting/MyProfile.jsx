import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";

export default function MyProfile(){
    const [Users , setUsers] = useState({});
    const cookie =  new Cookie();
    const token  =  cookie.get('jwt');
    console.log(token);
     useEffect(()=>{
         axios.get(`http://localhost:3001/registered/admin`,{
              headers: { Authorization: `jwt ${token}`,
              },
         })
         //.then((data) =>console.log(data))
         .then((data) =>console.log(data[0]))
         .catch((err) => console.log(err));
     });
    return(
        <>
        <diV>
        <p>Name : {Users.name}</p>
        <p>Email :{Users.email}</p> 
        </diV>
        </>
    )
}


