import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "../models/user.model";
import { AuthenticationService } from "../service";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (await AuthenticationService.findUserByEmail(email)) {
    } else {
      res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      // message:error?.message,
    });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (await AuthenticationService.findUserByEmail(email)) {
      res.status(httpStatus.PARTIAL_CONTENT).send({
        statusCode: httpStatus.PARTIAL_CONTENT,
        message: "User with this email already exists",
      });
    } else {
      const user = {
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        password: AuthenticationService.hashPassword(password),
      };
      const createdUser = await AuthenticationService.createUser(user as User);
      res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        message: "User created successfully",
        data: {
          createdUser,
          token: AuthenticationService.generateToken(createdUser),
        },
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      // message:error?.message,
    });
  }
}
