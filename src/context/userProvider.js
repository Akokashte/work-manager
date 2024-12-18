"use client";

import { currentUser } from "@/services/userService";
import { useEffect, useState } from "react";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
            setUserData();
    }, []);

    async function setUserData() {
        try {
            const currentUserData = await currentUser();
            setUser(currentUserData?.user);
        } catch (error) {
            setUser({});
            toast.error("Error while loading current user !!");
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;