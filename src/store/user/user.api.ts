import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "../../app/api"
import {
    ICompany,
    IDeveloper, IMatch,
    IReactionRequest,
    IReactionResponse,
    ISearch,
    IUser,
    IVacancy,
    IVacancyDto,
    Owner,
    SearchType,
    UserRole
} from "./user.types";

const userApi = createApi({
    reducerPath: 'api/user',
    baseQuery,
    endpoints: (builder) => ({
        postUserType: builder.mutation<Owner, { userRole: UserRole }>({
            query: (role) => ({
                url: `/api/user/role`,
                method: 'POST',
                body: {role: role.userRole}
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(userApi.util.resetApiState())
                    await queryFulfilled
                    dispatch(userApi.endpoints.userInfo.initiate())
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
                body: {
                    firstName, lastName, description, experience, position,
                    skills: skills.map(i => i.toLowerCase())
                }
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
            query: ({tags, ...data}) => ({
                url: `/api/vacancy`,
                method: 'POST',
                body: {
                    ...data,
                    tags: tags.map(i => i.toLowerCase())
                }
            }),
            async onQueryStarted({}, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    const patchResult = dispatch(
                        userApi.util.updateQueryData('getVacancies', undefined, (draft) => {
                            // Object.assign(draft, updatedPost)
                            console.log('CREATED', {draft, data})
                            // @ts-ignore
                            draft.push(data)
                        })
                    )
                } catch {
                }
            },
        }),
        search: builder.query<ISearch[], void>({
            query: () => `/api/search?exactMath=false&isCustom=false`,
            transformResponse: (res: any) => res.map(i => i.skills ? ({
                type: SearchType.DEVELOPER,
                data: i,
                id: i.id
            }) : ({
                type: SearchType.VACANCY,
                data: i,
                id: i.id
            }),)
        }),
        reaction: builder.mutation<IReactionResponse | void, IReactionRequest>({
            query: (data) => ({
                url: `/api/interactivity/reaction`,
                method: 'POST',
                body: data
            })
        }),
        getMatches: builder.query<IMatch[], void>({
            query: () => `/api/interactivity/matches`,
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
    useLazyGetVacanciesQuery,
    useSearchQuery,
    useLazySearchQuery,
    useReactionMutation,
    useLazyGetMatchesQuery
} = userApi;

export default userApi
