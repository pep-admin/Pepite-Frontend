import { createContext, useState, useContext } from "react";

const DataContext = createContext({ 
    displayType: "films",  
    setDisplayType: (string) => {} 
});

export const DataProvider = ({ children }) => {
    const [displayType, setDisplayType] = useState("films");

    return (
        <DataContext.Provider value={{ displayType, setDisplayType }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
