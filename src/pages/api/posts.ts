import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id, search } = req.query;

    if (id) {
      try {
        const post = await prisma.post.findUnique({
          where: { id: String(id) },
        });

        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json(post);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving post" });
      }
    } else {
      try {
        let posts;
        if (search) {
          posts = await prisma.post.findMany({
            where: {
              OR: [
                {
                  mainTitle: {
                    contains: search as string,
                    mode: "insensitive",
                  },
                },
                {
                  mainContent: {
                    contains: search as string,
                    mode: "insensitive",
                  },
                },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } else {
          // Wenn keine Suche, alle Posts zurückgeben
          posts = await prisma.post.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
        }
        return res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Fehler beim Abrufen der Posts" });
      }
    }
  } else if (req.method === "POST") {
    try {
      const { mainTitle, mainContent, author, additionalSections } = req.body;

      // Validate the request body
      if (!mainTitle || !mainContent || !author) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const post = await prisma.post.create({
        data: {
          mainTitle,
          mainContent,
          author,
          createdAt: new Date(),
          additionalSections: additionalSections ?? [],
        },
      });

      return res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
