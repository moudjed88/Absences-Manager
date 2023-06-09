// import style
import "../styles/header.css";

// import assets
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.svg";

// import utilities
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <Link to="/">
        <div className="header-logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h3>Absences Manager</h3>
        </div>
      </Link>
      <div className="user">
        <h3>
          {window.localStorage.getItem("firstName")}{" "}
          {window.localStorage.getItem("lastName")}
        </h3>
        <img src={avatar} alt="avatar" className="user-img" />
      </div>
    </header>
  );
}

export default Header;
