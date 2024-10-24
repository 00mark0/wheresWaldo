import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createScore = async (req, res) => {
  const { userId, imageId, timeTaken } = req.body;
  try {
    const score = await prisma.score.create({
      data: { userId, imageId, timeTaken },
    });
    res.status(201).json(score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
