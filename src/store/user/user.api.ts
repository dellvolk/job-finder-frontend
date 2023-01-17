import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "../../app/api"
import {IUser, UserRole} from "./user.types";

const userApi = createApi({
    reducerPath: 'api/user',
    baseQuery,
    endpoints: (builder) => ({
        postUserType: builder.mutation<any, {userRole: UserRole}>({
            query: (role) => ({
                url: `/api/user/role`,
                method: 'POST',
                body: {role: role.userRole}
            })
        }),
        userInfo: builder.query<IUser, void>({
            query: () => `/api/user`
        })
    })
});

export const {
    usePostUserTypeMutation,
    useUserInfoQuery,
    useLazyUserInfoQuery
} = userApi;

export default userApi
