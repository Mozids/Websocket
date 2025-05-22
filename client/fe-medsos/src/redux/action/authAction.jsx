import { APISERVICE, config } from "../../utils"

export const fetchProfile = (token) => (dispatch) => {
    APISERVICE().get('/auth/me', config(token))
        .then((response) => {
            dispatch({
                type: 'AUTH_PROFILE_SUCCESS',
                payload: {
                    data: response.data
                }
            })
        })
        .catch((err) => {
            if (err.response.status === 401) {
                window.location.href = '/login'
            }
            dispatch({
                type: 'AUTH_PROFILE_FAIL',
                payload: {
                    err: err.response
                }
            })
        })
}