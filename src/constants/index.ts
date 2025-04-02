export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  country_id?: number;
  is_active: boolean;
}

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  country_id: number;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  country_id?: number;
  is_active?: boolean;
}

export interface IVerify {
  user_id: number;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type Payload = {
  id: number;
};

export interface Iorder {
  id: number;
  user_id: number;
  status: string;
}


export interface Iproduct {
  id: number;
  name: string;
  merchant_id: number;
  price: number;
  status: string;
}