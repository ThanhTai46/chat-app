import React, { useContext, useMemo, useState } from "react";
import useFirestore from "../hook/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isInviteModal, setIsInviteModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const {
    user: { uid },
  } = useContext(AuthContext);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const findRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const userCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: findRoom.members,
    };
  }, [findRoom.members]);

  const members = useFirestore("users", userCondition);

  return (
    <AppContext.Provider
      value={{
        members,
        rooms,
        findRoom,
        isOpenModal,
        setIsOpenModal,
        selectedRoomId,
        setSelectedRoomId,
        isInviteModal,
        setIsInviteModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
