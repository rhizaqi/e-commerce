import { cookies } from "next/headers";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jose";
import { COLLECTION_USER } from "./constants";
import { getBD } from "./db";

interface userRegister {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface userLogin {
  email: string;
  password: string;
}

export const createUser = async (input: userRegister) => {
  const db = await getBD();

  const newUser: userRegister = {
    ...input,
    password: hashPassword(input.password),
  };

  const checkUsername = await db
    .collection(COLLECTION_USER)
    .findOne({ username: newUser.username });

  if (checkUsername) {
    throw new Error("Username must be unique");
  }

  const checkEmail = await db
    .collection(COLLECTION_USER)
    .findOne({ email: newUser.email });

  if (checkEmail) {
    throw new Error("Email must be unique");
  }

  // const projection = { password: 0 };

  // const regist = await db.collection(COLLECTION_USER).insertOne(newUser);

  await db.collection(COLLECTION_USER).insertOne(newUser);

  return {
    username: newUser.username,
    name: newUser.name,
    email: newUser.email,
  };
};

export const login = async (input: userLogin) => {
  const db = await getBD();

  if (!input.email) {
    throw new Error("Please input your email");
  }

  if (!input.password) {
    throw new Error("Please input your email");
  }

  const findUser = await db.collection(COLLECTION_USER).findOne({
    email: input.email,
  });

//   console.log(findUser, `<<<<<, user nya`);

  if (!findUser) {
    throw new Error("User not found, please register first");
  }

  const checkPassword = comparePassword(input.password, findUser.password);

  //   console.log(checkPassword, 1111111111); true false
  if (!checkPassword) {
    throw new Error("Your email or password is invalid");
  }

  const token = await createToken({
    id: findUser._id,
    email: findUser.email,
  });

//   cookies().set("access_token", token); ?????
  // console.log(token, `<<<<<, tokennih nya`);

  return token;
};
