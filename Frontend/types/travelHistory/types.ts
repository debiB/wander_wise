export interface Destination {
    _id?: string; 
    name: string;
    rating?: number;
}


export interface GetAllDestinationsByUserIdResponse {
    destinations: Destination[];
}


export interface GetDestinationByUserIdAndDestinationIdRequest {
    destinationId: string;
}

export interface GetDestinationByUserIdAndDestinationIdResponse {
    destination: Destination;
}


export interface GetDestinationByUserIdAndDestinationNameRequest {
    destinationName: string;
}


export interface GetDestinationByUserIdAndDestinationNameResponse {
    destination: Destination;
}


export interface GenerateTravelRecommendationRequest {
    customDescription?: string;
}


export interface GenerateTravelRecommendationResponse {
    recommendation: string;
}


export interface AddTravelHistoryRequest {
    destinations: Destination[];
}
export interface AddTravelHistoryResponse {
    message: string;
}
