import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, userType) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userType: userType
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, 1000000)
    } 
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        let url = '/person/get/' + email + '/' + password;
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data.personid, response.data.personid, response.data.userType))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authRegister = (email, password, telephoneNumber) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            phoneNumber: telephoneNumber,
        }
        console.log(authData)
        //let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwErEdHkTEGc1TM9KmlwqTMmdovQB70TU'
        // if(!isSignup) {
        //     url = ''
        // }
        axios.post('/person/add', authData)
            .then(response => {
                console.log(response)
                //dispatch(authSuccess(response.data.idToken, response.data.localId))
                //dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}