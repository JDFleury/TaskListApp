import React, { useState, createContext, useEffect, useMemo } from "react";
export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userUid, setUserUid] = useState('TEST');

    return (
        <UserContext.Provider value={{ userUid, setUserUid }}>
            {children}
        </UserContext.Provider>
    )
}