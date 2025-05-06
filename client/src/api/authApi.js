import { register } from "../../../server/src/v1/controllers/user";
import axiosClient from "./axiosClient";

const authApi = {
    register: (params) => axiosClient.post("auth/register", params),

};
export default.authApi;
