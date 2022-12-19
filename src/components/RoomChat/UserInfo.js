import { Avatar, Button, Typography } from "antd";
import React from "react";
import { useContext } from "react";
import styled from "styled-components";

import { auth } from "../../firebase/config";
import { AuthContext } from "../Context/AuthProvider";
const WrappedStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;
export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);
  return (
    <WrappedStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Logout
      </Button>
    </WrappedStyled>
  );
}
