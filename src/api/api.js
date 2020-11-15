import axios from 'axios';
import {isNil} from 'ramda';
import {requireAuthorization, setSubmitButtonState} from '../reducers/user.js';

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const errStatus = err.response.status;
    if (!isNil(errStatus) && errStatus === 401) {
      dispatch(requireAuthorization(true));
    } else if (!isNil(errStatus) && errStatus === 400) {
      dispatch(setSubmitButtonState(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
