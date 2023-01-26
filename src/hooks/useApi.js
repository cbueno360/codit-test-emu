/* eslint-disable */
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const { accessToken } = useAuth();

  axios.interceptors.request.use((config) => {
    config.baseURL = "https://codit-exam-test-api.azurewebsites.net";
    console.log(accessToken);
    //   const token = {token-from-azure-if-it-is-necessary};
    if (accessToken && config.headers)
      config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      const { data, status, config } = error.response;

      switch (status) {
        case 400:
          if (typeof data === "string") {
            toast.error(data);
          }
          if (config.method === "get" && data.errors.hasOwnProperty("id")) {
            //router.navigate("/not-found");
          }

          if (data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
              if (data.errors[key]) {
                modalStateErrors.push(data.errors[key]);
              }
            }
          }

          break;
        case 401:
          toast.error("unauthorised");
          break;
        case 404:
          //router.navigate("/not-found");
          break;
        case 500:
          break;
      }
      return Promise.reject(error);
    }
  );

  const reponseBody = (response) => response.data;

  const requests = {
    get: (url, azureCode) =>
      axios
        .get(url, { headers: { "x-functions-key": azureCode } })
        .then(reponseBody),
    post: (url, body) => axios.post(url, body).then(reponseBody),
    put: (url, body) => axios.put(url, body).then(reponseBody),
    del: (url) => axios.delete(url).then(reponseBody),
  };

  return [requests];
};
/* eslint-enable */
