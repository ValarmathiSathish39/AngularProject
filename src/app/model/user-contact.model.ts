export class UserContact {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gender: string;
  address: {
    addressLine: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}
