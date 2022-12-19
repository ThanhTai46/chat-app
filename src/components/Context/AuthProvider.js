import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/config";
import styled from "styled-components";

export const AuthContext = React.createContext();
const WrapperStyled = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unSubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUser({ displayName, email, photoURL, uid });
        setIsLoading(false);
        history.push("/");
        return;
      } else {
        setIsLoading(false);
        history.push("/login");
      }
    });
    return () => {
      unSubscribed();
    };
  }, [history]);
  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <WrapperStyled>
          <Spin size="large" tip="Loading..." />
        </WrapperStyled>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
