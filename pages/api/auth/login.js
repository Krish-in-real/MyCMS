// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/services/auth";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const item = await prisma.user.findUnique({
      where: { email },
    });
    if (!item) {
      res.status(404).json({ message: "Invalid credentials" });
    }
    item.password;
    const passwordMatches = await bcrypt.compare(password, item.password);
    if (passwordMatches) {
      const token = generateToken(email);
      res
        .status(200)
        .json({ status: "Success", message: "Login successful", token: token });
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }

    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
