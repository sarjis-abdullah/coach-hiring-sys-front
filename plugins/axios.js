import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken");
export default function ({ app, store, $axios }) {
    $axios.interceptors.request.use(function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // cookies.remove("accessToken");
        return;
      }
      return Promise.reject(error);
    }
  );
}
