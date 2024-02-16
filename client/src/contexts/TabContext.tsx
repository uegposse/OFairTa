import { createContext, useContext, useState } from "react";

interface ITabContext {
  showTab: boolean;
  setShowTab: (showTab: boolean) => void;
  idBank: string;
  setIdBank: (idBank: string) => void;
}

const defaultTabContext: ITabContext = {
  showTab: false,
  idBank: "",
  setIdBank: () => {},
  setShowTab: () => {},
};

export const TabContext = createContext(defaultTabContext);

export const useTabContext = () => useContext(TabContext);

interface TabProviderProps {
  children: React.ReactNode;
}

export const TabProvider = ({ children }: TabProviderProps) => {
  const [showTab, setShowTab] = useState(false);
  const [idBank, setIdBank] = useState("");

  const tabContextValue = {
    showTab,
    setShowTab,
    setIdBank,
    idBank,
  };

  return (
    <TabContext.Provider value={tabContextValue}>
      {children}
    </TabContext.Provider>
  );
};
