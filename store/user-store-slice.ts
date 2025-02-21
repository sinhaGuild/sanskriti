export interface SingleUser {
    userId: string | null
    credits: number
}
export type UserStoreState = {
    currentUser: SingleUser
}
export type UserStoreActions = {
    // check if input is null or undefined
    //retrieve user if exists and update current user 
    // or create a new user with 5 credits and update current user
    getOrCreateUser: (input: string | null | undefined) => void
    
    // update user credits in firebase and set current user
    updateUserCredits: (input: SingleUser) => void
    
    //decrease credit by 1
    debitUserCredit: (input: string | null | undefined) => void
}


export type UserStore = UserStoreState & UserStoreActions


export const initialUserState: UserStoreState = {
    currentUser: {
        userId: null,
        credits: 0
    }
}