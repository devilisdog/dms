import { stringify } from "querystring";
import { history } from "umi";
import { fakeAccountLogin } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
const Model = {
  namespace: "login",
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response, "response");
      yield put({
        type: "changeLoginStatus",
        payload: response,
      }); // Login successfully

      if (response.msg === "ok") {
        localStorage.setItem("token", response.data.token);
        const urlParams = new URL(window.location.hash);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf("#") + 1);
            }
          } else {
            window.location.hash = "/buildOrder";
            return;
          }
        }

        history.replace(redirect || "/buildOrder");
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== "/user/login" && !redirect) {
        history.replace({
          pathname: "/user/login",
          search: stringify({
            redirect: window.location.hash,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
