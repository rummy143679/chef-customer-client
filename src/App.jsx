import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routers } from "./routes/routers";

//evry user has unique email
// but if a admin has to login as cutomer and chef this has to handle

function App() {
  return (
    <>
      <Routes>{routers.map((route, index) => (<Route path={route.path} element={route.element} key={index} />))}</Routes>
    </>
  );
}

export default App;
