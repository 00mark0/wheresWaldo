import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    // Generate a unique sessionId
    const sessionId = uuidv4();

    let user = await prisma.user.findUnique({
      where: { sessionId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { name, sessionId },
      });
    } else if (name) {
      user = await prisma.user.update({
        where: { sessionId },
        data: { name },
      });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserScores = async (req, res) => {
  const { userId } = req.params;
  try {
    const scores = await prisma.score.findMany({
      where: { userId: parseInt(userId) },
      include: { image: true },
    });
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
