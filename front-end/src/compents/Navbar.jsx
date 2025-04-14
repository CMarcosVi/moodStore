import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MeuApp</h2>
      <ul style={styles.links}>
        <li>
          <Link style={linkStyle(location.pathname === "/")} to="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <li>
            <Link style={linkStyle(location.pathname === "/login")} to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link style={linkStyle(location.pathname === "/dashboard")} to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.logout}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#111",
    color: "#fff",
    alignItems: "center"
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: "1.5rem",
    margin: 0,
    padding: 0
  },
  logout: {
    background: "transparent",
    border: "1px solid #fff",
    padding: "0.3rem 0.8rem",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer"
  }
};

const linkStyle = (active: boolean): React.CSSProperties => ({
  color: active ? "#00faff" : "#fff",
  textDecoration: "none",
  fontWeight: active ? "bold" : "normal",
});

export default Navbar;
