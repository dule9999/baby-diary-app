export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
}

export interface Baby {
  id: string;
  name: string;
  img?: string | null;
  date_of_birth?: string | null; // ISO string
  blood_group?: string | null;
  address?: string | null;
  diary?: Entry[];          // optional, for frontend diary usage
  role?: 'owner' | 'viewer';     // optional, based on baby_users
}

export interface Entry {
  id: string;
  date: string;
  note: string;
  babyId: string;
}