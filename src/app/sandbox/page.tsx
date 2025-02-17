import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";
export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          console.log("hello");
          const folderInsert = await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              name: folder.name,
              parent: index !== 0 ? 1 : null,
              id: index + 1,
            })),
          );
          const fileInsert = await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 500,
              url: file.url,
              parent: index % 3,
            })),
          );
          console.log({ folderInsert });
          console.log({ fileInsert });
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
