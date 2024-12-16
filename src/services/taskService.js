import { httpAxios } from "@/helper/axiosHelper";

export async function addTask(task) {
    const result = await httpAxios.post("/api/tasks", task).then((response) => response.data)

    return result;
}

export async function getTaskOfUser(userId) {
    const res = await httpAxios.get(`/api/users/${userId}/tasks`)
        .then((response) => response.data);

    return res;
}

export async function deleteTaskOfUser(taskId) {
    const res = await httpAxios.delete(`/api/tasks/${taskId}`)
        .then(response => response.data);

    return res;
}

export async function editTaksOfUser(taskId,updatedData) {
    const res = await httpAxios.patch(`/api/tasks/${taskId}`,{updatedData})
    .then(response=>response.data);

    return res;
}