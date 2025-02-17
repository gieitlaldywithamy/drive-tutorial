import { GoogleDriveClone as DriveContents } from "../../drive-contents";
import { getAllParents, getFolders, getFiles } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parentFolders] = await Promise.all([
    getFolders(parsedFolderId),
    getFiles(parsedFolderId),
    getAllParents(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parentFolders={parentFolders}
    />
  );
}
