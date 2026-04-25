export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: number;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
