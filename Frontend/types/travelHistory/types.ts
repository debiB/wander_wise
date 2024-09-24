export interface Destination {
    _id?: string; 
    name: string;
    rating?: string;
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
    reccomendation: string;
}


export interface AddTravelHistoryRequest {
    destination : Destination[];
}
export interface AddTravelHistoryResponse {
    message: string;
}
export interface HotelResponse  {
    hotels: Hotel[];
};

export interface Hotel  {
    type: string;
    name: string;
    gps_coordinates: GPSCoordinates;
    check_in_time: string;
    check_out_time: string;
    rate_per_night: Rate;
    total_rate: Rate;
    prices: Price[];
    nearby_places: NearbyPlace[];
    images: Image[];
    location_rating: number;
    amenities: string[];
};

export interface GPSCoordinates  {
    latitude: number;
    longitude: number;
};

export interface Rate {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
};

export interface Price  {
    source: string;
    logo: string;
    num_guests: number;
    rate_per_night: {
        lowest: string;
        extracted_lowest: number;
    };
};

export interface NearbyPlace  {
    name: string;
    transportations: Transportation[];
};

export interface Transportation  {
    type: string;
    duration: string;
};

export interface Image  {
    thumbnail: string;
    original_image: string;
};
export interface HotelSearchRequest {
    
    check_in_date: string;         
    check_out_date: string;         
    adults: string;                 
    children: string;               
    children_ages: string;          
    sort_by: string;                
    min_price: string;              
    max_price: string;              
    rating: string;                 
    special_offers: boolean;
    vacation_rentals: boolean;
    bedrooms: string;               
    bathrooms: string;              
}
