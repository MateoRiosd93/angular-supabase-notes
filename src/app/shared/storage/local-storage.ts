export const getUserIdLocalStorage = () => {
    return localStorage.getItem('user-id')
}

export const setUserIdLocalStorage = (userId: string) => {
    localStorage.setItem('user-id', userId)
}
