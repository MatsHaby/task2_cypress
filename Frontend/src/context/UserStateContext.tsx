import { ApiResponse, UserType } from "../types";
import React, { createContext, useState } from "react";

type UserStateContextType = {
  user: ApiResponse<UserType> | null;
  setUser: React.Dispatch<React.SetStateAction<ApiResponse<UserType> | null>>
};

export const UserStateContext = createContext<UserStateContextType | undefined>(undefined);

export const UserStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ApiResponse<UserType> | null>(null);


  return (
    <UserStateContext.Provider value={{ user, setUser }}>
      {children}
    </UserStateContext.Provider>
  );
};
