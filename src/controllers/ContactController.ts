import { Request, Response } from "express";
import Contact from "../models/Contact";
import User from "../models/User";

export default class ContactController {
  createContact = async (req: Request, res: Response) => {
    const { user, name, surname, email, phone } = req.body;

    const checkUser = await User.findOne({ _id: user });

    if (checkUser) {
      try {
        const contact = await Contact.create({
          user,
          name,
          surname,
          email,
          phone,
        });

        return res
          .status(200)
          .json({ message: "Contato criado com sucesso", contact });
      } catch (error) {
        return res.status(400).json({ error: "Erro ao criar contato" });
      }
    } else {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
  };

  getContacts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const contacts = await Contact.find({ user: id });
      return res.status(200).json({ contacts });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar contatos" });
    }
  };

  updateContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, surname, email, phone } = req.body;

    try {
      const contact = await Contact.findByIdAndUpdate(id, {
        name,
        surname,
        email,
        phone,
      });
      return res.status(200).json({ contact });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar contato" });
    }
  };

  deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await Contact.findByIdAndDelete(id);
      return res.status(200).json({ message: "Contato deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar contato" });
    }
  };
}
