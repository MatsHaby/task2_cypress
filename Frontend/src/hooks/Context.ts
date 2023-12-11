import { UserStateContext } from "../context/UserStateContext";
import { useContext } from "react";

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserStateProvider");
  }
  return context;
};
