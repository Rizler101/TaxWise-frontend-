import React, { createContext, useState, useContext } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  // ✅ Add a helper to add files
  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <FileContext.Provider value={{ files, addFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
