import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {RootState} from "../store/store"

const baseUrl = "/api"

// const baseQuery = (): BaseQueryFn<
//     {
//         url: string;
//         method: AxiosRequestConfig['method'];
//         data?: AxiosRequestConfig['data'];
//     },
//     unknown,
//     unknown
//     > => async ({ url, method, data }) => {
//     try {
//         const result = await axios({ url: baseUrl + url, method, data });
//         return { data: result.data };
//     } catch (axiosError) {
//         let err = axiosError as AxiosError;
//         return { error: { status: err.response?.status, data: err.response?.data } };
//     }
//
// };

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	prepareHeaders: async (headers, { getState }) => {
        console.log('+++++')
        headers.set('Content-Type', 'application/json;charset=utf-8')
		// By default, if we have a token in the store, let's use that for authenticated requests
		// const token = (getState() as RootState).auth.token
        console.log({auth: (getState() as RootState).auth})
        // const firebaseApp = (getState() as RootState).auth.auth.app

        // console.log('HEEL', {firebaseApp})

        const currentUser = (getState() as RootState).auth.auth.currentUser
        const token = await currentUser.getIdToken(true);
        console.log({token})
		if (token) {
			headers.set("Authentication", `Bearer ${token}`)
		}
		return headers
	},
	// fetchFn: (input, init) => {
	//     console.log({input, init})
	//     // return Promise.resolve();
	//     return input.
	// }
})

export default baseQuery
