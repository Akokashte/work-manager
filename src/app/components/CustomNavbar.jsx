'use client';

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Swal from "sweetalert2";

const CustomNavbar = () => {
    const context = useContext(UserContext);

    const router = useRouter();

    const logoutUser = async () => {
        try {
            await logout();
            context.setUser(undefined);
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged out successfully !",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/login");
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "failed to logout !!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            <nav className="bg-blue-600 h-12 py-2 px-4 flex justify-between items-center">
                <div className="brand text-xl font-semibold text-white">
                    <a href="#">Work Manager</a>
                </div>
                {
                    context.user && <div>
                        <ul className="flex gap-5 text-white">
                            <li>
                                <Link href="/" className="hover:text-blue-200" >Home</Link>
                            </li>
                            <li>
                                <Link href="/add-task" className="hover:text-blue-200">Add Task</Link>
                            </li>
                            <li>
                                <Link href="/show-tasks" className="hover:text-blue-200">Show Tasks</Link>
                            </li>
                        </ul>
                    </div>
                }
                <div className="text-white">
                    <ul className="flex gap-5">
                        {
                            context.user && <>
                                <li>
                                    <Link href="#!" className="hover:text-blue-200">{context.user.name}</Link>
                                </li>
                                <li>
                                    <button className="hover:text-blue-200" onClick={logoutUser}>Logout</button>
                                </li>
                            </>
                        }
                        {
                            !context.user &&
                            <>
                                <li>
                                    <Link href="/login" className="hover:text-blue-200">Login</Link>
                                </li>
                                <li>
                                    <Link href="/signup" className="hover:text-blue-200">SignUp</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default CustomNavbar;