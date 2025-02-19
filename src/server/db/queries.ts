import "server-only";

import { db } from "~/server/db";
import {
  DB_FILETYPE,
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParents: async (folderId: number) => {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },
  getFolders: (parsedFolderId: number) => {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, parsedFolderId))
      .orderBy(foldersSchema.id);
  },
  getFiles: (parsedFolderId: number) => {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, parsedFolderId))
      .orderBy(filesSchema.id);
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },
};

//
export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
    });
  },
};
