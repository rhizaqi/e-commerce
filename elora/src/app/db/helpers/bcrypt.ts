import { hashSync, compareSync} from "bcryptjs";


export const hashPassword = (password: string) => {
  return hashSync(password);
};

export const comparePassword = (password: string, hashed:string) => {
    return compareSync(password, hashed)
}