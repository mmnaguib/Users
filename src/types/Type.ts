
export type UserType = {
    id: number,
    name: string,
    username: string,
    phone: string,
    address: string,
    company: string,
    website: string
}

export type userStateType = {
    loading: boolean,
    error: string,
    users: UserType[]
}
