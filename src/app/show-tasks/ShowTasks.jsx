"use client";

import React, { useContext, useEffect, useState } from "react";
import { deleteTaskOfUser, getTaskOfUser } from "@/services/taskService";
import UserContext from "@/context/userContext";
import Task from "./Task";
import { AnimatePresence } from "framer-motion";
import { Toast } from "@/helper/toastAlerts/toast";

const ShowTask = () => {
    const context = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    const loadTasks = async (userId) => {
        try {
            const taskResponse = await getTaskOfUser(userId);
            setTasks(taskResponse.userTasks.reverse());
        } catch (error) {
            toast.error("failed to load tasks !!");
        }
    }

    useEffect(() => {
        if (context?.user) {
            loadTasks(context?.user?._id);
        }
    }, [context.user])

    const deleteTask = async (taskId) => {
        try {
            const isDeleted = await deleteTaskOfUser(taskId)

            if (isDeleted) {
                loadTasks(context?.user?._id)
                return true;
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "failed to delete task try again !!",
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-12 min-h-screen">
                <div className="col-span-6 col-start-4 py-3 flex flex-col gap-6  max-[729px]:col-span-10 max-[729px]:col-start-2">
                    <h1 className="text-white text-center text-2xl py-4">Your tasks ({tasks.length})</h1>
                    <AnimatePresence>
                        {
                            tasks.map((task, index) => {
                                return <Task task={task} author={context?.user?.name} deleteTask={deleteTask} key={index} />
                            })
                        }
                    </AnimatePresence>
                </div>

            </div>
        </>
    )
}

export default ShowTask;