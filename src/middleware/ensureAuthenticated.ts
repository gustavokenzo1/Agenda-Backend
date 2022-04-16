import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.headers;

  if (!user_id) {
    return res
      .status(401)
      .json({ error: "Você deve estar logado para executar essa ação" });
  } else {
    const user = await User.findById(user_id);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Você deve estar logado para executar essa ação" });
    } else {
      return next();
    }
  }
}
