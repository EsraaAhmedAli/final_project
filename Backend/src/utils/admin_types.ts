/* eslint-disable prettier/prettier */
export type CreateAdminParams = {
    name: string;
    email: string;
    password: string;
    is_active: boolean;
    permissions_ids: number[];
    faculties_ids: number[];
}

export type UpdateAdminParams = {
    name: string;
    email: string;
    is_active: boolean;
    permissions_ids: number[];
    faculties_ids: number[];
}