import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav} className="navBar">
      <ul style={styles.links}>
        <div>
          <li>
            <Link
              className="linksNavBar"
              style={linkStyle(location.pathname === "/user")}
              to="/user"
            >
              <img className="img-nav-bar" src="../public/navbar-Images/account.png" alt="User" />
            </Link>
          </li>
        </div>
        <div className="navBarUtilizarion">
          <li>
            <Link
              className="linksNavBar"
              style={linkStyle(location.pathname === "/")}
              to="/"
            >
              <img className="img-nav-bar" src="../public/navbar-Images/home.png" alt="Home" />
            </Link>
          </li>
          <li>
            <Link
              className="linksNavBar"
              style={linkStyle(location.pathname === "/login")}
              to="/login"
            >
              <img className="img-nav-bar" src="../public/navbar-Images/home.png" alt="Login" />
            </Link>
          </li>
        </div>
        <div>
          <li>
            <button
              className="linksNavBar"
              id="logout"
              style={styles.logout}
              onClick={handleLogout}
            >
              <img className="img-nav-bar" src="../public/navbar-Images/logout.png" alt="Logout" />
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: "1.5rem",
    margin: 0,
  },
};

const linkStyle = (active: boolean): React.CSSProperties => ({
  color: active ? "#00faff" : "#fff",
  textDecoration: "none",
  fontWeight: active ? "bold" : "normal",
});

export default Navbar;
