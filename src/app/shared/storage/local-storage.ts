import { USER_ID } from "../utils/constants"

export const getUserIdLocalStorage = () => {
    return localStorage.getItem(USER_ID)
}

export const setUserIdLocalStorage = (userId: string) => {
    localStorage.setItem(USER_ID, userId)
}
