export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
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