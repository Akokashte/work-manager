"use client"

import React, { useContext, useState } from "react";
import newLoginSvg from "../../assets/newLogin.svg";
import Image from "next/image";
import { currentUser, login } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import Swal from 'sweetalert2';

const Login = () => {
    const router = useRouter();
    const context = useContext(UserContext);
    const [loginUserData, setLoginUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setLoginUserData(
            {
                ...loginUserData,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        context.setLoading(true)
        try {
            const response = await login(loginUserData);

            if (!response.success) {
                context.setLoading(false)
                toast.error("Error while logging in !!", { position: "top-center" });
                return;
            }

            const loggedInUser = await currentUser()

            context.setUser(loggedInUser?.user);

            context.setLoading(false)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged in successfully !",
                showConfirmButton: false,
                timer: 1500
            });

            router.push("/");
        } catch (error) {
            context.setLoading(false)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "failed to login !!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-12 my-11 h-screen max-[729px]:h-fit max-[729px]:py-4">
                <div className="col-span-4 col-start-5  max-[729px]:col-span-10 max-[729px]:col-start-2">
                    <div className="w-56 mx-auto my-2">
                        <Image src={newLoginSvg} style={{ objectFit: "cover" }} alt="add task image" />
                    </div>
                    <div>
                        <h1 className="text-white text-2xl font-semibold text-center">Login here</h1>
                    </div>
                    <div>
                        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-white block">Email</label>
                                <input type="email" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="email" name="email"
                                    onChange={handleChange} value={loginUserData.email} required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-white block">Password</label>
                                <input type="password" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="password" name="password"
                                    onChange={handleChange} value={loginUserData.password} required
                                />
                            </div>
                            <div className="flex justify-center gap-4">
                                <input type="submit" className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer" value={"Login"} />
                                <button className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                                    onClick={() => setTask({
                                        email: "",
                                        password: "",
                                    })}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;