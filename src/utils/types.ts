export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface FormStateType {
  status: string;
  message: string;
  data?: Record<string, any>;
}

export interface CommonAttrs {
  id: string;
  label: string;
  name: string;
}

export interface ExtraAttrs {
  min?: string | number;
  max?: string | number;
  cols?: string | number;
  rows?: string | number;
  step?: string | number;
}

export interface InputOptions extends CommonAttrs {
  value?: string;
}

export interface InputField extends CommonAttrs  {
  type: string;
  extra_attrs?: ExtraAttrs;
  options?: InputOptions[]
}
