import axios from "axios";

const reisseToken = axios.create();

reisseToken.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};

  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
});

reisseToken.interceptors.response.use(
  (res) => res,

  (err) => {
    const original = err.config;

    // accessToken 만료
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403) &&
      !original._retry
    ) {
      original._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      return axios
        .post(`http://localhost:8080/api/reissue`, {
          refreshToken: refreshToken,
        })

        .then((re) => {
          console.log(re);
          const newAccess = re.data.items.accessToken;
          const newRefresh = re.data.items.refreshToken;

          sessionStorage.setItem("accessToken", newAccess);
          sessionStorage.setItem("refreshToken", newRefresh);

          original.headers.Authorization = "Bearer " + newAccess;

          return axios(original); // 원래 요청 재전송
        })
        .catch(() => {
          sessionStorage.clear();
          //window.location.href = '/login';
        });
    }

    return Promise.reject(err);
  },
);

export default reisseToken;
