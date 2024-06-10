import axios from "axios";

const instance = axios.create({
    baseURL: "/user",
    withCredentials: true,
    timeout: 15000
});


/**
 * axios api 로그인 요청
 * @param email
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosLogin = async (email, password) => {
    try {
        return await instance.post("/login", {
            email,
            password,
        });
    } catch (error) {
        throw error;
    }

}


export const axiosMe = async () => {
    try {
        return await instance.get("/me");
    } catch (error) {
        throw error;
    }

}