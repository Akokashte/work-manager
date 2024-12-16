import { httpAxios } from "@/helper/axiosHelper";

export async function createUser(userData) {
   const userCreatedResponse = await httpAxios.post("/api/users", userData).then((response) => response.data);
   return userCreatedResponse;
}

export async function login(loginUserData) {
   const userLoginResponse = await httpAxios.post("/api/login", loginUserData).then((response) => response.data);
   return userLoginResponse;
}

export async function currentUser() {
   const currentUserResponse = await httpAxios.get("/api/current").then((response) => response.data);
   return currentUserResponse;
}

export async function logout(){
   return await httpAxios.post("/api/logout").then((response)=>response.data);
}