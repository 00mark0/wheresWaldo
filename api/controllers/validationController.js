import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const validateClick = async (req, res) => {
  const { imageId, x, y } = req.body;
  const tolerance = 50; // Increase the tolerance area to 50 pixels

  try {
    const characters = await prisma.character.findMany({
      where: { imageId: parseInt(imageId) },
      include: { coordinates: true },
    });

    for (const character of characters) {
      const { coordinates } = character;
      for (const coordinate of coordinates) {
        const distance = Math.sqrt(
          Math.pow(coordinate.x - x, 2) + Math.pow(coordinate.y - y, 2)
        );
        if (distance <= tolerance) {
          return res
            .status(200)
            .json({ success: true, character: character.name });
        }
      }
    }

    res.status(200).json({ success: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
