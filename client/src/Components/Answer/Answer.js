import React from 'react'
import profile from '../../CommonResources/User.png'
import "./Answer.css";

const Answer = ({ answer, userName }) => {
  return (
    <div className="container-fluid">
      <hr />
      <div className="all">
        <div className="img_and_username">
          <img className="avatar" src={profile} alt="User Avatar" />
          <h6 className="userName">{userName}</h6>
        </div>
        <div className="answer">
          <h6 className="">{answer}</h6>
        </div>
      </div>
    </div>
  );
};

export default Answer;