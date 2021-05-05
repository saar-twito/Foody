import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:3001/'
})

// Wii work only if the error is not 400 <= 500
// from the server router where we define the response
instance.interceptors.response.use(null, ex => {
    console.log(ex.message);
    const expectedError = // Expected error
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500;

    if (!expectedError) {
        toast.error('Unknown error occurred', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        });
    }

    return Promise.reject(ex);
});

const includeTokenInRequests = (jwt) => {
    // * With every HTTP request, include this header (token)
    instance.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    includeTokenInRequests,
    tokenKey: "token"
};


