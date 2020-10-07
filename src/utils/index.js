import axios from "axios";

const localhosts = ["127.0.0.1", "localhost"];

export const apicallUri = localhosts.includes(window.location.hostname)
  ? "http://localhost:3001"
  : "https://ms-login-api.herokuapp.com";

const callAPi = async (reqObj) => {
  try {
    return await axios({
      method: "post",
      url: `${apicallUri}${reqObj.uri}`,
      headers: { Authorization: reqObj.idToken },
      data: { type: reqObj.type, ...reqObj.data },
    });
  } catch (error) {
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
