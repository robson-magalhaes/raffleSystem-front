import { RootState } from "../store"

type UserActionType = {
    type: string,
    payload: {
        email: string,
        password: string,
        token: string
    }
}
export const UserReducer = (state = [], action: UserActionType) => {
    switch (action.type) {
        case 'SET_USER':
            
            return [...state, { email: action.payload.email, password: action.payload.password }]
        case 'SET_TOKEN':
            localStorage.setItem('authToken', action.payload.token);
            return
        case 'SET_LOGOUT':
            localStorage.removeItem('authToken');
            return
        default:
            return state;
    }
}

export const selectCount = (state: RootState) => state.counter.value
export default UserReducer;