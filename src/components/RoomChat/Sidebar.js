import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import ListRoom from "./ListRoom";
import UserInfo from "./UserInfo";

const SidebarStyled = styled.div`
  background-color: #3f0e40;
  color: white;
  height: 100vh;
`;
export default function Sidebar() {
  return (
    <div>
      <SidebarStyled>
        <Row>
          <Col span={24}>
            <UserInfo />
          </Col>
          <Col span={24}>
            <ListRoom />
          </Col>
        </Row>
      </SidebarStyled>
    </div>
  );
}
