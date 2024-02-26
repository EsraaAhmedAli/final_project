/* eslint-disable prettier/prettier */

import { Department } from "src/typeOrm/entities/department.entity";
import { Staff } from "src/typeOrm/entities/staff.entity";

/* eslint-disable prettier/prettier */
export type CreateFacultyParams = {
    name: string;
    dean_name: string;
    admins_ids: number[];
    departments: Department[];
    staff: Staff[];
};

export type UpdateFacultyParams = {
    name: string;
    dean_name: string;
    admins_ids: number[];
    departments: Department[];
    staff: Staff[];
};