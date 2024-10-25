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

export const getScoresByImage = async (req, res) => {
  const { imageId } = req.params;
  try {
    const scores = await prisma.score.findMany({
      where: { imageId: parseInt(imageId) },
      orderBy: { timeTaken: "asc" },
      include: { user: true },
    });
    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
