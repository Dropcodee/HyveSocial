import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // set authorization to token just like in postman
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
