// import style
import "../styles/signup.css";

// import utilities
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import assets
import logo from "../assets/logo.png";
import arrow from "../assets/arrow.svg";
import signupImg from "../assets/signup.svg";

function Signup() {
  const navigate = useNavigate();

  const [obscure, setObscure] = useState(true);

  const togglePassword = () => {
    const pwd = document.querySelector('#password');
    if (obscure) {
      setObscure(false)
      pwd.setAttribute('type', 'text');
    }
    else {
      setObscure(true)
      pwd.setAttribute('type', 'password');
    }
  }

  const [type, setType] = useState("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentCardNum, setStudentCardNum] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [departement, setDepartement] = useState("");
  const [group, setGroup] = useState("");
  const [classModule, setClassModule] = useState("");

  const showAdditionalInfos = () => {
    const blackBG = document.getElementById("black-bg");
    const additionalStudentInfos = document.getElementById(
      "additional-infos-student"
    );
    const additionalTeacherInfos = document.getElementById(
      "additional-infos-teacher"
    );

    if (type === "student") {
      additionalStudentInfos.style.display = "block";
      blackBG.style.display = "block";
    } else {
      additionalTeacherInfos.style.display = "block";
      blackBG.style.display = "block";
    }
  };

  const check="@univ-annaba.dz";

  const checkEmail = (e) => {
    let mail=document.getElementById("email");
    let advice=document.getElementById("advice");
    if(email.endsWith(check)){
      mail.style.borderColor="var(--primary)"
        showAdditionalInfos();
    }
    else{ e.preventDefault();
        mail.style.borderColor = "#E74C3C";
        advice.style.color = "#E74C3C";
    }
}

  const goBack = () => {
    document.getElementById("black-bg").style.display = "none";
    document.getElementById("additional-infos-student").style.display = "none";
    document.getElementById("additional-infos-teacher").style.display = "none";
  };

  const signup = () => {
    console.log(departement,classModule)
    Axios.post("http://localhost:3001/signup", {
      type: type,
      firstName: firstName, 
      lastName: lastName,
      email: email,
      password: password,
      studentCardNum: studentCardNum,
      teacherCode: teacherCode,
      speciality: speciality,
      departement: departement,
      group: group,
      classModule: classModule,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.dbresult.password === password) {
          window.localStorage.setItem("token", res.data.dbresult._id);
          window.localStorage.setItem("firstName", res.data.dbresult.first_name);
          window.localStorage.setItem("lastName", res.data.dbresult.last_name);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("accountType", res.data.account_type);
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-banner">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h3>Absences Manager</h3>
        </div>
        <img
          src={signupImg}
          className="signup-illustration"
          alt="Signup Illustration"
        />
        <div className="continue">
          <h1>
            Create your Companion
            <br />
            account to continue
          </h1>
          <img src={arrow} alt="Arrow" />
        </div>
      </div>
      <div className="signup-form">
        <div className="welcome-login">
          <h1>Welcome</h1>
          <h2>To Absences Manager of Badji Mokhtar </h2>
          <h2>University Annaba UBMA</h2>
        </div>
        <form autoComplete="off" spellCheck="false">
          <div className="account-type">
            <label htmlFor="type">I am a</label>
            <div>
              <input
                type="radio"
                name="type"
                id="student"
                value="student"
                defaultChecked
                onClick={() => {
                  setType("student");
                }}
              />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                id="teacher"
                value="teacher"
                onClick={() => {
                  setType("teacher");
                }}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
          <div className="names-labels">
            <label htmlFor="first-name">First Name</label>
            <label htmlFor="last-name">Last Name</label>
          </div>
          <div className="names">
            <input
              type="text"
              name="first-name"
              id="first-name"
              required
              maxLength={50}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              name="last-name"
              id="last-name"
              required
              maxLength={30}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <label htmlFor="email">
            Email Address <small id="advice">(UBMA professional email only)</small> 
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            maxLength={50}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <div className="pass">
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={6}
              maxLength={40}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {obscure && <FontAwesomeIcon
              icon={faEye}
              style={{
                marginLeft: "-2.4rem",
                marginBottom: "-0.3rem",
                width: "26px",
                height: "26px",
                cursor: "pointer",
                color: "#3d7b30",
              }}
              id="toggle-password"
              onClick={togglePassword}
            />}
            {!obscure && <FontAwesomeIcon
              icon={faEyeSlash}
              style={{
                marginLeft: "-2.4rem",
                marginBottom: "-0.3rem",
                width: "26px",
                height: "26px",
                cursor: "pointer",
                color: "#3d7b30",
              }}
              id="toggle-password"
              onClick={togglePassword}
            />}
            
          </div>
          <small>
            Already have an account? <Link to="/login">Click here</Link>
          </small>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn">
              reset
            </button>
            <button
              type="button"
              className="main-btn"
              onClick={checkEmail}
            >
              continue
            </button>
          </div>
        </form>
      </div>
      <div className="black-bg" id="black-bg"></div>
      <div className="additional-infos" id="additional-infos-student">
        <h1>Almost there..</h1>
        <h3>
          Please enter the rest of your student informations and you're good to
          go
        </h3>
        <form>
          <div className="additional-inputs">
            <input
              type="number"
              required
              placeholder="Student Card Number"
              minLength="12"
              maxLength="12"
              onChange={(e) => {
                setStudentCardNum(e.target.value);
              }}
            />
            <select
              name="speciality"
              id="speciality"
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
            >
              <option disabled selected>
                {" "}
                Speciality{" "}
              </option>
              <option disabled >
                {" "}
                licence{" "}
              </option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option disabled >
                {" "}
                master{" "}
              </option>
              <option value="SE">SE</option>
              <option value="SI">SI</option>
              <option value="RESEAU">RESEAU</option>
              <option value="IA">IA</option>
              <option value="IL">IL</option>
            </select>
            <select
              name="group"
              id="group"
              onChange={(e) => {
                setGroup(e.target.value);
              }}
            >
              <option disabled selected value>
                {" "}
                Group{" "}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn" onClick={goBack}>
              go back
            </button>
            <button type="button" className="main-btn" onClick={signup}>
              create
            </button>
          </div>
        </form>
      </div>
      <div className="additional-infos" id="additional-infos-teacher">
        <h1>Almost there..</h1>
        <h3>
          Please enter the rest of your teacher informations and you're good to
          go
        </h3>
        <form>
          <div className="additional-inputs">
            <input
              type="number"
              required
              placeholder="123456789"
              onChange={(e) => {
                setTeacherCode(e.target.value);
              }}
            />
            <select
              name="Departement"
              id="Departement"
              placeholder="Departement"
              onChange={(e) => {
                console.log(e.target.value)
                setDepartement(e.target.value);
              }}
          >   <option disabled selected value>
                {" "}
                Departement{" "}
              </option>
              <option value="MI">MI</option>
              <option value="INFO">INFO</option>
            </select>
            <select
              name="class"
              id="class"
              placeholder="Class"
              onChange={(e) => {
                console.log(e.target.value)
                setClassModule(e.target.value);
              }}
            > <option disabled selected value>
                {" "}
                Module{" "}
              </option>
              <option value="SE">SE</option>
              <option value="COMP">COMP</option>
              <option value="IHM">IHM</option>
              <option value="PS">PS</option>
              <option value="PL">PL</option>
              <option value="GL">GL</option>
            </select>
          </div>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn" onClick={goBack}>
              go back
            </button>
            <button type="button" className="main-btn" onClick={signup}>
              confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
