import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import store from "./redux/store";
import RoutesApp from "./routes/routes";
import Navbar from "./components/Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AppContent = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const newToken = Cookies.get("token");
    setToken(newToken);

    const isLoginRoute = location.pathname === "/login";

    setShowNavbar(!!newToken && !isLoginRoute);
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <RoutesApp />
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
