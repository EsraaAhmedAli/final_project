/* eslint-disable prettier/prettier */

import { Staff } from "src/typeOrm/entities/staff.entity";

/* eslint-disable prettier/prettier */
export type CreateDepartmentParams = {
    name: string;
    staff: Staff[];
}

export type UpdateDepartmentParams = {
    name: string;
    staff: Staff[];
}