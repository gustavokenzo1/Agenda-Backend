import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({ error: "Email já cadastrado" });
    } else {
      const cryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: cryptedPassword,
      });

      return res
        .status(200)
        .json({ message: "Usuário criado com sucesso", user });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar usuários" });
    }
  };

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar usuário" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password,
      });
      await user.save();

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar usuário" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar usuário" });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao logar usuário" });
    }
  }
}
