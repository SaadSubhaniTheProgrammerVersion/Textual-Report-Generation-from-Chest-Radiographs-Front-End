import { createContext, useState } from "react";

export const userContext = createContext(null);

function Context({ children }) {
  const [User, setUser] = useState({name: "", status: false});

  return (
    <userContext.Provider value={{ User, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default Context;