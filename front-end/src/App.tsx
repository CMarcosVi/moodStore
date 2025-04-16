import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import store from "./redux/store";
import RoutesApp from "./routes/routes";
import Navbar from "./compents/Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const App = () => {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(Cookies.get("token")); // checa se o cookie ainda existe
    }, 500); // verifica a cada 0.5s — pode ajustar esse tempo

    return () => clearInterval(interval);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {token && <Navbar />}
        <AnimatePresence mode="wait">
          <RoutesApp />
        </AnimatePresence>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
