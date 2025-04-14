import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import store from "./redux/store";
import RoutesApp from "./routes/routes";
import Navbar from "./compents/Navbar"; // não precisa da extensão


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence mode="wait">
          <RoutesApp />
        </AnimatePresence>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
