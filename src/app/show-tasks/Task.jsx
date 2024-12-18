import UserContext from "@/context/userContext";
import React, { useContext } from "react";
import Swal from 'sweetalert2'

const Task = ({ task, author, deleteTask }) => {

    console.log(task)
    const context = useContext(UserContext);

    const handleDeleteTask = async (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (deleteTask(taskId)) {
                    Swal.fire("task deleted successfully !", "", "success");
                }
            } else if (result.isDenied) {
                Swal.fire("you denied for deletion", "", "info");
            }
        });
    }

    return (
        <>
            <div className={`flex flex-col ${task.status === "pending" ? "bg-gray-800" :
                task.status === "completed" ? "bg-green-700" : null} px-5 py-3 rounded-lg`}>
                <div className="flex justify-between">
                    <h1 className="font-semibold capitalize text-xl text-white">
                        {task.title}
                    </h1>
                    <div className="flex gap-5">
                        <div className="bg-gray-900 rounded-full px-4 py-1 flex justify-center align-middle hover:bg-red-500 cursor-pointer transition-all text-white" onClick={() => handleDeleteTask(task._id)}>
                            Delete
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-white">
                    {task.content}
                </p>
                <div className="flex justify-between mt-6">
                    <span className="font-semibold text-white">Status : {task.status}</span>
                    <span className="capitalize text-white text-right">Author: <span className="font-semibold text-white">{author}</span></span>
                </div>
            </div>
        </>
    )
}

export default Task;