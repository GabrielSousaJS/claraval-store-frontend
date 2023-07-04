import "./assets/styles/custom.scss";
import "./App.css";
import RoutesApp from "RoutesApp";
import { AuthContext, AuthContextData } from "AuthContext";
import { useState } from "react";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <RoutesApp />
    </AuthContext.Provider>
  );
}

export default App;
