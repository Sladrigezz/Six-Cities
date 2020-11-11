import axios from 'axios';
import {requireAuthorization} from '../reducers/user';

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    if (err.response.satus === 403) {
      return requireAuthorization(true);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
