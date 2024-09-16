
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import{GetDestinationByUserIdAndDestinationIdResponse, GetDestinationByUserIdAndDestinationNameResponse,GenerateTravelRecommendationResponse,  GenerateTravelRecommendationRequest, AddTravelHistoryResponse,AddTravelHistoryRequest,Destination }  from "@/types/travelHistory/types"
export const travelAPI = createApi({
  reducerPath: 'travelAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/user', 
    prepareHeaders: (headers) => {
     const token = localStorage.getItem('token');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  
  return headers;
}
  }),
  endpoints: (builder) => ({
    getAllTravelHistory: builder.query<Destination[], any>({
      query: () => ({
        url: `/getAllTravelHistory`,
        method: 'GET',
      }),
    }),
    
    getTwoTravelHistory: builder.query<Destination[], any>({
      query: () => ({
        url: `/getTwoTravelHistory`,
        method: 'GET',
      }),
    }),
    getAllTravelHistoryById: builder.query<GetDestinationByUserIdAndDestinationIdResponse, any>({
      query: (destinationId) => ({
        url: `/getAllTravelHistoryById`,
        method: 'GET',
        params: {destinationId}
      }),
    }),
    
     getAllTravelHistoryName: builder.query<GetDestinationByUserIdAndDestinationNameResponse, any>({
      query: (destinationName) => ({
        url: `/getAllTravelHistoryName`,
        method: 'GET',
        params: {destinationName}
      }),
    }),
    generateRecommendation: builder.mutation<GenerateTravelRecommendationResponse, GenerateTravelRecommendationRequest>({
      query: (body) => ({
        url: '/generate-recommendation',
        method: 'POST',
        body,
      }),
    }),
     addTravelHistory: builder.mutation<AddTravelHistoryResponse, AddTravelHistoryRequest>({
      query: (body) => ({
        url: '/addTravelHistory',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useAddTravelHistoryMutation, useGenerateRecommendationMutation, useGetAllTravelHistoryByIdQuery, useGetAllTravelHistoryNameQuery, useGetAllTravelHistoryQuery, useGetTwoTravelHistoryQuery} = travelAPI;