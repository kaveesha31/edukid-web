import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/userContext";
import "./styles.css";
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    
  const authContext = useContext(AuthContext);
  const history = useHistory();

  return (
    <div className="intro">
    <div className="black"></div>  
    <div className="white"></div>
    <div className="boxfather">
      <div className="box">
        <h1>WELCOME</h1>
        <button  onClick={(e: any) => {
                if(authContext.userType === "teacher"){
                    history.push("/classrooms")
                } else {
                    history.push("/home")
                }
              }}>Enter</button>
      </div>
    </div>
    
  </div>
  )

}


export default Welcome;