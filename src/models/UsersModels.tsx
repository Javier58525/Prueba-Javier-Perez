export interface RandomUserResponse {
    results: User[];
    info: { seed: string; 
            results: Number; 
            page: Number;  
            version: string; 
        };
}

export interface User {
    gender: string;
    name: {first: string; last: string;};
    location: { street: { number: Number; name: string }; city: string; state: string; country: string; postcode: string | Number; coordinates: { latitude: string; longitude: string }; timezone: { offset: string; description: string } };
    email: string;
    login: { uuid: string; username: string; password: string; salt: string; md5: string; sha1: string; sha256: string };
    dob: { date: string; age: Number };
    registered: { date: string; age: Number };
    phone: Number;
    cell: Number;
    id: { name: string; value: string };
    picture: { large: string; medium: string; thumbnail: string };
    nat: string;
}

export interface Catfacth{
    fact: string;
    length: Number;
}

export interface CatFactsResponse{
    current_page: Number;
    data: Catfacth[];
    first_page_url: string;
    from: Number;
    last_page: Number;
    last_page_url: string;
    next_page_url: string;
    path: string; 
    per_page: Number;
    prev_page_url: string;
    to: Number;
    total: Number;
}

export interface MixedData {
    data:{
    catFact: string;
    user: User;
    }[];
}




