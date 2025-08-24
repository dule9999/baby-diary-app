export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface Baby {
    id: string
    name: string
    img: string
    diary: Entry[]
}

export interface Entry {
  id: string;
  date: string;
  note: string;
}