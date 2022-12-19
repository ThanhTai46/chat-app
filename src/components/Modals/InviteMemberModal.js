import { Avatar, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useContext, useState } from "react";
import { useMemo } from "react";
import { AppContext } from "../Context/AppProvider";
import { AuthContext } from "../Context/AuthProvider";
import { db } from "../../firebase/config";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetching = useMemo(() => {
    const loaderOptions = (values) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(values, props.currentMember).then((newOption) => {
        setOptions(newOption);
        setFetching(false);
      });
    };
    return debounce(loaderOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetching}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoUrl}>
            {opt.photoUrl ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
async function fetchUserList(search, currentMember) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoUrl: doc.data().photoUrl,
        }))
        .filter((opt) => !currentMember.includes(opt.value));
    });
}
export default function InviteMemberModal() {
  const { isInviteModal, setIsInviteModal, selectedRoomId, findRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [form] = Form.useForm();

  const handleOnOk = async () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [...findRoom.members, ...value.map((val) => val.value)],
    });
    await setIsInviteModal(false);
  };
  const handleOnCancel = () => {
    setIsInviteModal(false);
  };

  return (
    <div>
      <Modal
        title="Invite Member"
        open={isInviteModal}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            fetchOptions={fetchUserList}
            mode="multiple"
            label="Member"
            value={value}
            placeholder="Input name member..."
            onChange={(newOptions) => setValue(newOptions)}
            style={{ width: "100%" }}
            currentMember={findRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
