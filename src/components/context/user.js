import {createContext, useReducer} from 'react'

export const UserContext = createContext()

const defaultState = {
    isLogin: false,
    user: {},
}

function reducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case 'AUTH_SUCCESS':
        case 'LOGIN':
            localStorage.setItem("token", payload.token);
            return {
                isLogin: true,
                user: payload
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem("token");
            return {
                isLogin: false,
                user: {}
            }
        default: throw new Error()
    }
}

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, defaultState)

    return (
        <UserContext.Provider value={ [state, dispatch] }>
            { children }
        </UserContext.Provider>
    )
}