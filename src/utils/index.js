import axios from "axios";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

const { REACT_APP_SECRET_KEY } = process.env;
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
    console.log(error);
    toast.error("failed");
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
const verifyToken = (token) => {
  try {
    return jwt.verify(token, REACT_APP_SECRET_KEY);
  } catch (error) {
    console.log(error);
    return false;
  }
};
export { onChange, callAPi, onSubmit, verifyToken };
