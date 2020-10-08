import axios from "axios";
import { toast } from "react-toastify";

const localhosts = ["127.0.0.1", "localhost"];

export const apicallUri = localhosts.includes(window.location.hostname)
  ? "http://localhost:3001"
  : "https://ms-login-api.herokuapp.com";

const callAPi = async (reqObj, setToken) => {
  try {
    const res = await axios({
      method: "post",
      url: `${apicallUri}${reqObj.uri}`,
      headers: { Authorization: reqObj.idToken },
      data: { type: reqObj.type, ...reqObj.data },
    });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error("Login failed");
    return error;
  }
};

const onChange = (e, setState) => {
  const { value, name } = e.target;
  setState((prevState) => ({ ...prevState, [name]: value }));
};
const onSubmit = (e, fn) => {
  e.preventDefault();
  fn();
};
export { onChange, callAPi, onSubmit };
