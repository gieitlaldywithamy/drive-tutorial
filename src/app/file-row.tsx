import { Link, FileIcon } from "lucide-react";
import { File } from "~/lib/mock-data";

export const FileRow = ({ id, url, name }: File) => {
  return (
    <li
      key={id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={url ?? "#"}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FileIcon className="mr-3" size={20} />
            {name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">File</div>
        <div className="col-span-3 text-gray-400">2 MB</div>
      </div>
    </li>
  );
};
