import React, { useContext } from "react";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import Register from "./screens/Register";
import Main from "./screens/Main";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      {user ? <Main /> : <Register />}
    </>
  );
}

export default App;
