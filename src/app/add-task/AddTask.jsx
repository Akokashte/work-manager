"use client"

import React, { useContext, useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import UserContext from "@/context/userContext";
import { Toast } from "@/helper/toastAlerts/toast";

const AddTask = () => {
    const context = useContext(UserContext);

    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "none",
    })

    console.log(task)

    const handleInputChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleAddTaskSubmit = async (e) => {
        e.preventDefault();
        context.setLoading(true);
        try {
            if (task.status === "none") {
                toast.error("please select valid status !!")
                return;
            }
            const result = await addTask(task);
            console.log(result)
            if (!result) {
                Toast.fire({
                    icon: "error",
                    title: "something went wrong while adding task !!"
                });
            }

            setTask({
                title: "",
                content: "",
                status: "none",
            })

            context.setLoading(false);

            Toast.fire({
                icon: "success",
                title: "task added successfully !"
            });


        } catch (error) {
            console.log(error);
            context.setLoading(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "error while adding task !!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-12 justify-center h-screen max-[729px]:h-fit max-[729px]:py-4 max-[729px]:text-black">
                <div className="col-span-4 col-start-5 flex flex-col gap-4  p-3 max-[729px]:col-span-10 max-[729px]:col-start-2">
                    {/* add task image */}
                    <div className="w-56 mx-auto max-[729px]:w-full">
                        <Image src={loginSvg} style={{ objectFit: "cover" }} alt="add task image" />
                    </div>

                    {/* form heading */}
                    <h1 className="text-white text-center text-xl">Add Your Task Here</h1>

                    {/* form here */}
                    <form className="flex flex-col gap-4" onSubmit={handleAddTaskSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="task_title" className="text-white block">Title</label>
                            <input type="text" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="task_title" name="title" onChange={handleInputChange}
                                value={task.title} required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="task_content" className="text-white block">Content</label>
                            <textarea rows={5} type="text" className="rounded-lg px-3 py-1 focus:ring-gray-300 border-none" id="task_content"
                                name="content"
                                onChange={handleInputChange}
                                value={task.content}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="task_status" className="text-white block">Task Status</label>
                            <select id="task_status" className="rounded-lg px-3 py-2" name="status" value={task.status} onChange={handleInputChange} required>
                                <option value={"none"} disabled>---Select Status---</option>
                                <option value={"pending"}>Pending</option>
                                <option value={"completed"}>Completed</option>
                            </select>
                        </div>

                        {/* button actions */}
                        <div className="flex justify-center gap-4">
                            <input type="submit" className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" value={"Submit"} />
                            <button className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                                onClick={() => setTask({
                                    title: "",
                                    content: "",
                                    status: "none",
                                })}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTask;