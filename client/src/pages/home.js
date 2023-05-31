//import style
import "../styles/home.css";
import QRCode from 'qrcode.react';

//import partials
import Header from "../partials/header";
import SideMenu from "../partials/side-menu";

//import assets
import avatar from "../assets/avatar.svg";
import { TbCirclePlus } from "react-icons/tb";

//import utilities
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();

  const [myAbsencesList, setMyAbsencesList] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [qrCodeData, setQrCodeData] = useState({});

  const accountType = window.localStorage.getItem("accountType");
  const userId = window.localStorage.getItem("token");

  const loggedIn = window.localStorage.getItem("loggedIn");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");

    if (!loggedIn) navigate("/login");
    else {
      setIsLoading(true);
      Axios.post("http://localhost:3001/user", {
        type: window.localStorage.getItem("accountType"),
        id: window.localStorage.getItem("token"),
      })
        .then((res) => {
          console.log(res.data);
          setQrCodeData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="home" />
        {accountType === "admin" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              <div className="tasks">
                <div className="qrcode">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {console.log("mama",qrCodeData)}
                      <QRCode value={JSON.stringify(qrCodeData)} />
                    </>
                  )}
                </div>
                <button
                  className="task-btn"
                  onClick={() => {
                    navigate("/teachers");
                  }}
                >
                  <TbCirclePlus className="plus1" />
                  Create an account for a teacher
                </button>
                <button
                  className="task-btn"
                  onClick={() => {
                    navigate("/students");
                  }}
                >
                  <TbCirclePlus className="plus1" />
                  Create an account for a student
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon" />
            </div>
          </div>
        )}
        {accountType === "teacher" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              <div className="tasks">
                <div className="qrcode">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {console.log("mama",qrCodeData)}
                      <QRCode value={JSON.stringify(qrCodeData)} />
                    </>
                  )}
                </div>
                <button
                  className="task-btn"
                  onClick={() => {
                    navigate("/sesions");
                  }}
                >
                  <TbCirclePlus className="plus1" />
                  Create a new sesions
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon" />
            </div>
          </div>
        )}
        {accountType === "student" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              <div className="tasks">
                <div className="qrcode">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {console.log("mama",qrCodeData)}
                      <QRCode value={JSON.stringify(qrCodeData)} />
                    </>
                  )}
                </div>
                <button
                  className="task-btn"
                  onClick={() => {
                    navigate("/my-absences");
                  }}
                >
                  <TbCirclePlus className="plus1" />
                  My Absences
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
