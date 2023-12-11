export type UserType =  {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type CreateUser = Omit<UserType, "id">
export type LoginUser = Pick<UserType, "email" | "password">

export type PostData = CreateUser | LoginUser

