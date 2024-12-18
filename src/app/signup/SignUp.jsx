"use client";

import React, { useContext, useState } from "react";
import signUpSvg from "../../assets/signup.svg";
import Image from "next/image";
import { createUser, currentUser } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import Swal from "sweetalert2";
import { Toast } from "@/helper/toastAlerts/toast";

const SignUp = () => {
    const router = useRouter();
    const context = useContext(UserContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const userCreated = await createUser(userData);
            context.setLoading(true)

            if (!userCreated) {
                context.setLoading(false)

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error while creating user !!",
                    showConfirmButton: false,
                    timer: 1500
                });

                setUserData({
                    name: "",
                    email: "",
                    password: "",
                    about: "",
                    profileUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                })
                return
            }

            context.setLoading(false)

            Toast.fire({
                icon: "success",
                title: "user registered and logged in successfully"
            });

            setUserData({
                name: "",
                email: "",
                password: "",
                about: "",
                profileUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            })
            const loggedInUser = await currentUser()
            context.setUser(loggedInUser?.user);
            router.push("/");
        } catch (error) {
            context.setLoading(false)

            Toast.fire({
                icon: "error",
                title: "failed to signup !!"
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-12 py-6 min-h-screen">
                <div className="col-span-4 col-start-5 flex flex-col gap-6 max-[729px]:col-span-10 max-[729px]:col-start-2 max-[729px]:text-black">
                    <div className="w-56 mx-auto">
                        <Image src={signUpSvg} style={{ objectFit: "cover" }} alt="add task image" />
                    </div>
                    <div>
                        <h1 className="text-white text-2xl font-semibold text-center">SignUp here</h1>
                    </div>
                    <div>
                        <form className="flex flex-col gap-3" onSubmit={handleSignup}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="username" className="text-white block">Username</label>
                                <input type="text" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="username" name="name"
                                    onChange={handleChange} value={userData.name} required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-white block">Email</label>
                                <input type="email" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="email" name="email"
                                    onChange={handleChange} value={userData.email} required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-white block">Password</label>
                                <input type="password" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="password" name="password"
                                    onChange={handleChange} value={userData.password} required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="about" className="text-white block">About</label>
                                <textarea rows={5} type="text" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="about" name="about"
                                    onChange={handleChange} value={userData.about} required
                                />
                            </div>
                            <div className="flex justify-center gap-4">
                                <input type="submit" className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer" value={"SignUp"} />
                                <button className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                                    onClick={() => setTask({
                                        name: "",
                                        email: "",
                                        password: "",
                                        about: "",
                                        profileUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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

export default SignUp;