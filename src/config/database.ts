import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  } catch (error) {
    console.log("Falha ao conectar com o banco de dados");
  }
};

export default database;
