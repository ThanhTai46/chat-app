import { Col, Row } from "antd";
import React from "react";
import AddRoomModal from "../Modals/AddRoomModal";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

export default function RoomChat() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
          <AddRoomModal />
        </Col>
      </Row>
    </div>
  );
}
