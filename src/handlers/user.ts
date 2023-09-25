import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { User, UserStore } from "../models/user";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export function generateToken(value: any, expiredTime: string) {
  return jwt.sign(value, TOKEN_SECRET as Secret, { expiresIn: expiredTime });
}

const store = new UserStore();

export function getBearerToken(req: Request, res: Response, next: any) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json("Unauthorized");
    }
    next();
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
}

export function verifyAccessToken(req: Request, res: Response, next: any) {
  try {
    const accessToken = req.headers.authorization.split(" ")[1] || null;
    const decodedToken = jwt.verify(accessToken, TOKEN_SECRET) as JwtPayload;

    if (decodedToken.exp && decodedToken.exp < Date.now()) {
      return res.status(401).json({ message: "Token expired" });
    }
    next();
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
}

export async function authenticateUser(req: Request, res: Response) {
  try {
    console.log(req.body.username, req.body.password);
    const user = await store.authenticate(req.body.username, req.body.password);

    if (user) {
      const accessToken = generateToken(user, "30s");
      const refreshToken = generateToken(user, "1m");

      // Set the JWT token in the response header.
      res.setHeader("Authorization", `Bearer ${accessToken}`);

      // Store the refresh token in the user's browser.
      res.cookie("refreshToken", refreshToken);

      // Send the response to the user.
      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function refreshToken(req: Request, res: Response) {
  console.log(req.body);
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const decodedToken = jwt.verify(refreshToken, TOKEN_SECRET) as any;
    const user: User = {
      id: decodedToken.id,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      username: decodedToken.username
    }
    const newAccessToken = generateToken(user, '30s');
    const newRefreshToken = generateToken(user, '1m');
    return res.status(200).json({
      newAccessToken,
      newRefreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUserList(_req: Request, res: Response) {
  try {
    const users = await store.index();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json("Cannot get user list");
  }
}

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(404).json(error + user);
  }
}
