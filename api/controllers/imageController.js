import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createImage = async (req, res) => {
  const { url } = req.body;
  try {
    const image = await prisma.image.create({
      data: { url },
    });
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getImageDetails = async (req, res) => {
  const { imageId } = req.params;
  try {
    const image = await prisma.image.findUnique({
      where: { id: parseInt(imageId) },
      include: {
        characters: {
          include: {
            coordinates: true,
          },
        },
      },
    });
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
