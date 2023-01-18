
export enum UserRole {
    ADMIN = 'admin',
    DEVELOPER = 'developer',
    COMPANY = 'company',
    USER = 'user',
}

// export interface IUser {
//     id: number;
//     email: string;
//     role: UserRole;
//     firebaseUserId: string;
// }

export interface Experience {
    to: number;
    from: number;
    tags: string[];
    title: string;
}

export interface Owner {
    id: number;
    email: string;
    role: UserRole;
    firebaseUserId: string;
}

interface CompanyOwner extends Owner {
    role: UserRole.COMPANY
}

interface DeveloperOwner extends Owner {
    role: UserRole.DEVELOPER
}

interface IUserData {
    id: number;
    description: string;
    owner: Owner;
}

export interface IDeveloper extends IUserData{
    position: string;
    firstName: string;
    lastName: string;
    experience: Experience[];
    skills: string[];
    owner: DeveloperOwner
}

export interface ICompany extends IUserData{
    title: string;
    image?: any;
    owner: CompanyOwner
}

export type IUser = ICompany | IDeveloper

export enum VacancyEntityLocationType {
    HYBRID = 'hybrid',
    OFFICE = 'office',
    REMOTE = 'remote',
}

export type IVacancyDto = {
    title: string
    description: string
    tags: string[]
    location: string
    locationType: VacancyEntityLocationType
    published: boolean
}

export interface IVacancy extends IVacancyDto {
    id: number
    created_at: Date;
    updated_at: Date;
    company: {
        id: number;
        title: string;
        description: string;
        image?: any;
    };
}

export type IDeveloperVacancy = {
    id: number;
    username: string;
    description: string;
    location: string;
    skills: string[];
}

export const isDeveloper = (user:IUser):user is IDeveloper => {
    return user.owner.role === UserRole.DEVELOPER
}

export const isCompany = (user:IUser):user is ICompany => {
    return user.owner.role === UserRole.COMPANY
}


