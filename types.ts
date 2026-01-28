
export enum UserRole {
  PLAYER = 'PLAYER',
  SCOUT = 'SCOUT',
  ADMIN = 'ADMIN'
}

export enum ScoutTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export enum PlayerPosition {
  GK = 'Goalkeeper',
  CB = 'Center Back',
  LB = 'Left Back',
  RB = 'Right Back',
  CM = 'Central Midfield',
  LW = 'Left Wing',
  RW = 'Right Wing',
  ST = 'Striker'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  tier?: ScoutTier;
  createdAt: number;
  status: 'Active' | 'Inactive';
}

export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  age: number;
  position: PlayerPosition;
  club: string;
  location: string;
  image: string;
  stats: PlayerStats;
}
