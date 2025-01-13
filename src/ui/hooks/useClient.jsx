import { createContext, useState, useContext, useMemo } from "react";

const SAMPLE_LOGS = [
  {
    id: 1,
    timestamp: new Date().toLocaleTimeString(),
    message: "Client connected",
    location: "system",
    type: "system",
  },
];

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState(SAMPLE_LOGS);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logs,
      setLogs,
    }),
    [user, setUser, logs, setLogs]
  );

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
