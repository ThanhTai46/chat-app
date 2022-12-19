import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../Context/AppProvider";
import AddRoomModal from "../Modals/AddRoomModal";

export default function ListRoom() {
  const { Panel } = Collapse;
  const { rooms, isOpenModal, setIsOpenModal, setSelectedRoomId } =
    useContext(AppContext);
  const PanelStyled = styled(Panel)`
    &&& {
      .ant-collapse-header,
      p {
        color: white;
      }
      .ant-collapse-content-box {
        padding: 0 40px;
      }
    }
    .add-room {
      color: white;
      padding: 0;
    }
  `;

  const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
  `;

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  return (
    <div>
      <Collapse ghost defaultActiveKey={[1]}>
        <PanelStyled className="text-white" header="List Room" key={"1"}>
          {rooms.map((room) => (
            <LinkStyled
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
            >
              {room.name}
            </LinkStyled>
          ))}

          <Button
            onClick={handleOpenModal}
            type="text"
            icon={<PlusSquareOutlined />}
            className="add-room"
          >
            Add Room
          </Button>
        </PanelStyled>
      </Collapse>
      {isOpenModal && <AddRoomModal />}
    </div>
  );
}
