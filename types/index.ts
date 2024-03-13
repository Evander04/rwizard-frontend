import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type PermissionType={
  id:number,
  title: string;
  status: boolean;
  code: string;
}

export type RoleType = {
  id?: number; // Mark id as optional if it can be null initially
  title: string;
  status: boolean;
  code: string;
  permissions?: PermissionType[]; // Array of Permission entities
  users?: UserType[]; 
}

export type LogType= {
  id?: number;
  code: number;
  message: string;
  date: Date;
  user?: UserType;
}

export type UserType= {
  id?: number;
  username: string;
  password: string;
  email: string;
  status: boolean;
  role?: RoleType;
  person?: PersonType;
  logs?: LogType[];
}

export type PersonType = {
  id?: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  phone: string;
  address: string;
  users?: UserType[];
}