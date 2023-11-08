"use client";

import axios from 'axios';
import React, { createContext, ReactNode, useState, useEffect } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

export const GlobalContext = createContext({});

interface User {
    email: string;
    name: string;
}

export default function ContextProvider({ children }: ThemeProviderProps) {

    const [userData, setuserData] = useState<User | undefined>(undefined);

    const getUserData = async () => {
        try {
            const res = await axios.get('/api/users/data');
            console.log(res.data);
            setuserData(res.data.user);
        } catch (error) {
            console.log(error);
            setuserData(undefined);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    return <GlobalContext.Provider value={{userData, setuserData, getUserData}}>
        {children}
    </GlobalContext.Provider>
}
