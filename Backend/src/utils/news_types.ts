/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
export type CreateNewsParams = {
    title: string;
    description: string;
    link: string;
    faculties_ids: number[]
}

export type UpdateNewsParams = {
    title: string;
    description: string;
    link: string;
    faculties_ids: number[] // ......................
}