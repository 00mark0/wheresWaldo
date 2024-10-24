import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCoordinate = async (req, res) => {
  const { characterId, x, y } = req.body;
  try {
    const coordinate = await prisma.coordinate.create({
      data: { characterId, x, y },
    });
    res.status(201).json(coordinate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
