import React, { useState, createContext, useEffect, useMemo } from "react";
export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [userUid, setUserUid] = useState('');

    return (
        <UserContext.Provider value={{ userUid, setUserUid }}>
            {children}
        </UserContext.Provider>
    )
}