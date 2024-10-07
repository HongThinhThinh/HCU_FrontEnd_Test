import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../../models/Task";

interface StateContextType {
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
  isLighting: boolean;
  setIsLighting: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: StateContextType = {
  data: [],
  setData: () => {},
  isLighting: false,
  setIsLighting: () => {},
};

const StateContext = createContext<StateContextType>(defaultState);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Task[]>([]);
  const [isLighting, setIsLighting] = useState(() => {
    return JSON.parse(localStorage.getItem("isLighting") || "false");
  });

  const state = {
    data,
    setData,
    isLighting,
    setIsLighting,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
