import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCharacter = async (req, res) => {
  const { name, imageId } = req.body;
  try {
    const character = await prisma.character.create({
      data: { name, imageId },
    });
    res.status(201).json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
