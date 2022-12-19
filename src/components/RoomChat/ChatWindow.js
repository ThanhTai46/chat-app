import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../Context/AppProvider";
import InviteMemberModal from "../Modals/InviteMemberModal";
import Message from "./Message";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../Context/AuthProvider";
import useFirestore from "../hook/useFirestore";
import { formatRelative } from "date-fns";

const WrapperStyled = styled.div`
  height: 100vh;
`;
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230 230 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 4px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: scroll;
`;
const ChatWindow = () => {
  const { findRoom, members, isInviteModal, setIsInviteModal, selectedRoomId } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: findRoom.id,
      displayName,
    });

    form.resetFields(["message"]);
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: findRoom.id,
    }),
    [findRoom.id]
  );
  const messages = useFirestore("messages", condition);
  const formatDate = (seconds) => {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  };
  return (
    <WrapperStyled>
      {selectedRoomId ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{findRoom?.name}</p>
              <span className="header__description">
                {findRoom?.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteModal(true)}
              >
                Invite
              </Button>
              <Avatar.Group size={"large"} maxCount={2}>
                {members.map((member) => (
                  <Tooltip key={member.id} title={member.displayName}>
                    <Avatar src={member.photoUrl}>
                      {member.photoUrl
                        ? ""
                        : member?.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  text={msg.text}
                  photoUrl={photoURL}
                  displayName={msg.displayName}
                  createdAt={formatDate(msg.createdAt.seconds)}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Input your message..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
          {isInviteModal && <InviteMemberModal />}
        </>
      ) : (
        <Alert
          message="Select room"
          type="info"
          style={{ margin: 5 }}
          closable
          showIcon
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
