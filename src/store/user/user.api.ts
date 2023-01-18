import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "../../app/api"
import {ICompany, IDeveloper, IUser, IVacancy, IVacancyDto, Owner, UserRole} from "./user.types";

const userApi = createApi({
    reducerPath: 'api/user',
    baseQuery,
    endpoints: (builder) => ({
        postUserType: builder.mutation<Owner, {userRole: UserRole}>({
            query: (role) => ({
                url: `/api/user/role`,
                method: 'POST',
                body: {role: role.userRole}
            }),
            async onQueryStarted(activation_code, {dispatch, queryFulfilled}) {
                try {
                    dispatch(userApi.util.resetApiState())

                    await queryFulfilled
                    dispatch(userApi.endpoints.userInfo.initiate())
                    // dispatch(updateUser(updatedPost))
                    // const patchResult = dispatch(
                    //     userApi.util.updateQueryData('getUserInfo', undefined, (draft) => {
                    //         Object.assign(draft, updatedPost)
                    //     })
                    // )
                } catch {
                }
            },
        }),
        userInfo: builder.query<IUser, void>({
            query: () => `/api/user/data`
        }),
        updateDeveloperInfo: builder.mutation<IDeveloper, IDeveloper>({
            query: ({firstName, lastName, description, experience, position, skills}) => ({
                url: `/api/user/data/developer`,
                method: 'POST',
                body: {firstName, lastName, description, experience, position, skills}
            })
        }),
        updateCompanyInfo: builder.mutation<ICompany, ICompany>({
            query: ({description, title}) => ({
                url: `/api/user/data/company`,
                method: 'POST',
                body: {description, title}
            })
        }),
        getVacancies: builder.query<IVacancy[], void>({
            query: () => `/api/vacancy/my`
        }),
        addVacancy: builder.mutation<IVacancy, IVacancyDto>({
            query: (data) => ({
                url: `/api/vacancy`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted({  }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const patchResult = dispatch(
                        userApi.util.updateQueryData('getVacancies', undefined, (draft) => {
                            // Object.assign(draft, updatedPost)
                            console.log('CREATED', {draft, data})
                            // @ts-ignore
                            draft.push(data)
                        })
                    )
                } catch {}
            },
        }),
    })
});

export const {
    usePostUserTypeMutation,
    useUserInfoQuery,
    useLazyUserInfoQuery,
    useUpdateDeveloperInfoMutation,
    useUpdateCompanyInfoMutation,
    useGetVacanciesQuery,
    useAddVacancyMutation,
    useLazyGetVacanciesQuery
} = userApi;

export default userApi
