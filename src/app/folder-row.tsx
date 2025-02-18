import { Folder as FolderIcon } from "lucide-react";
import Link from "next/link";
import type {
  DB_FOLDERTYPE,
  folders_table as Folder,
} from "~/server/db/schema";

export const FolderRow = ({ name, id }: DB_FOLDERTYPE) => {
  console.log({ id });
  return (
    <li
      key={id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
      </div>
    </li>
  );
};
