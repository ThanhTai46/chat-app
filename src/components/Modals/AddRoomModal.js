import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { addDocument } from "../../firebase/service";
import { AppContext } from "../Context/AppProvider";
import { AuthContext } from "../Context/AuthProvider";

export default function AddRoomModal() {
  const { isOpenModal, setIsOpenModal } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [form] = Form.useForm();

  const handleOnOk = async () => {
    await addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    await setIsOpenModal(false);
  };
  const handleOnCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <div>
      <Modal
        title="Create New Room"
        open={isOpenModal}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room Name" name="name">
            <Input placeholder="Input room name..." />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Input description..."
              name="description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
