/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* eslint-disable prettier/prettier */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}