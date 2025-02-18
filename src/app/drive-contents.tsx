"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow } from "./file-row";
import { FolderRow } from "./folder-row";
import type {
  DB_FILETYPE,
  DB_FOLDERTYPE,
  files_table,
  folders_table,
} from "~/server/db/schema";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { OurFileRouter } from "./api/uploadthing/core";
import { UploadButton } from "~/components/ui/uploadbuttons";
import { useRouter } from "next/navigation";

export const GoogleDriveClone = (props: {
  files: DB_FILETYPE[];
  folders: DB_FOLDERTYPE[];
  parentFolders: DB_FOLDERTYPE[];
}) => {
  const { files, folders, parentFolders } = props;

  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/f/1`} className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {parentFolders.map(
              (folder, index) =>
                folder.id !== 1 && (
                  <div key={folder.id} className="flex items-center">
                    <ChevronRight className="mx-2 text-gray-500" size={16} />
                    <Link
                      href={`/f/${folder.id}`}
                      className="text-gray-300 hover:text-white"
                    >
                      {folder.name}
                    </Link>
                  </div>
                ),
            )}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {folders.map((folder) => (
              <FolderRow key={folder.id} {...folder} />
            ))}
            {files.map((file) => (
              <FileRow key={file.id} {...file} />
            ))}
          </ul>
        </div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
        />
      </div>
    </div>
  );
};
