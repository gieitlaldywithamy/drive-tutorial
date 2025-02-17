import { Folder as FolderIcon } from "lucide-react";
import type { folders_table as Folder } from "~/server/db/schema";

type FolderRowProps = typeof Folder.$inferSelect & {
  onClick: (id: number) => void;
};

export const FolderRow = ({ name, id, onClick }: FolderRowProps) => {
  return (
    <li
      key={id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => onClick(id)}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
      </div>
    </li>
  );
};
