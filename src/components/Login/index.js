import React from "react";

import { Row, Col, Button, Typography } from "antd";

import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
import { FacebookFilled } from "@ant-design/icons";

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleLoginFb = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoUrl: user.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  const handleLoginGoogle = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      googleProvider
    );
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoUrl: user.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Vào đây chat cho vui
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleLoginGoogle}
          >
            Login with Google
          </Button>
          <Button
            style={{ width: "100%", backgroundColor: "#fafafa" }}
            onClick={handleLoginFb}
          >
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
