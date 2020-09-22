import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const checkJWT = async (req: Request, res: Response, next: any) => {
  try {
    let token = req.headers["auth"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token) {
      token && Array.isArray(token) ? (token = token[0]) : "";
      token = token.replace(/Bearer /gi, "");
      try {
        const jwtPayload = jwt.verify(token, config.appSecert);
        req.headers["jwt"] = JSON.stringify(jwtPayload);
      } catch (err) {
        next("Failed to authenticate token.");
      }
      next();
    } else
      res.send(
        "Yo momma is so fat, when she sat on the back of the bus it did a wheelie."
      );
  } catch (err) {
    console.log("checkJWT -> err", err);
  }
};
