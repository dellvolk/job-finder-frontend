import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "../../app/api"
import { IApartment, IPredict, IRealtyEstatesOptions, IUserRealty } from "./user.types";

const userApi = createApi({
	baseQuery,
	endpoints: (builder) => ({
    getRealtyEstatesOptions: builder.query<IRealtyEstatesOptions, void>({
      query: () => `/api/realty-estates/options/`,
    }),
    getRealtyEstatesHistory: builder.query<IUserRealty[], void>({
      query: () => `/user-realty/`,
      // query: () => `/api/realty-estates/`,
      transformResponse: (res:IUserRealty[], _, q: any) => res.reverse()
    }),
    getDataByLink: builder.mutation<IApartment, string>({
			query: (url) => ({
				url: `/api/realty-estates/get_data_by_link/`,
				method: 'GET',
				params: {url}
			})
			// transformResponse: (res: {permissions: []}, _, q: void | number) => res.permissions
		}),
    predictPrice: builder.mutation<IPredict, IApartment>({
      query: (body) => ({
        url: `/api/realty-estates/predict/`,
        method: 'POST',
        body
      }),
    }),
	})
});

export const { useGetDataByLinkMutation, useGetRealtyEstatesOptionsQuery, usePredictPriceMutation, useGetRealtyEstatesHistoryQuery, useLazyGetRealtyEstatesHistoryQuery } = userApi;

export default userApi
