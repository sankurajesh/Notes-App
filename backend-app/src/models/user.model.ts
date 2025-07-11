import { ObjectId } from "mongodb";

export interface User{
    _id?: ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userName: string,
    password: string,
}

export interface Note {
  _id?: ObjectId;
  userId: ObjectId;
  category: string;
  title: string;
  content: string;
  date: string;
}