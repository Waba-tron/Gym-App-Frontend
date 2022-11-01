import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { ROUTES } from "./consts/RouteConstants";

function App() {
  return (
    <div>
      <Routes>
        {ROUTES.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
