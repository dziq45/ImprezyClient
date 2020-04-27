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
        const authData = {
            email: email,
            password: password
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAamJ7kgZqfufsMZgWQhtb0ZtfETT6gZ0U'
        //let url = 'http://localhost:8001/api/auth/signin'
        // if(!isSignup) {
        //     url = ''
        // }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data.userType)
                dispatch(authSuccess(response.data.accessToken, response.data.id, response.data.userType))
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
        let url = 'http://localhost:8001/api/auth/signup'
        // if(!isSignup) {
        //     url = ''
        // }
        axios.post(url, authData)
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