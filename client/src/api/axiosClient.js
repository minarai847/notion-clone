import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1"
const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
    baseURL: BASE_URL,
});

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
    return {
        congfig,
        headers: {
            "Cntent-Type": "applicatio/json",
            authorization: `Bearer: ${getToken()}`,//リクエストヘッダにJWTをつけてサーバーに渡す

        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
        (response) => {
            return response;
        },
            (err) => {
                throw err.response;
            }
    });

export default axiosClient;

