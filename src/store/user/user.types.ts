
export enum UserRole {
    ADMIN = 'admin',
    DEVELOPER = 'developer',
    COMPANY = 'company',
    USER = 'user',
}

export interface IUser {
    id: number;
    email: string;
    role: UserRole;
    firebaseUserId: string;
}

export type IVacancy = {
    title: string
    description: string
    skills: string[]
}

export type IDeveloperVacancy = {
    id: number;
    username: string;
    description: string;
    location: string;
    skills: string[];
}


