import { MaxWidthWrapper } from "../max-width-wrapper";
import { FileX2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkspaceNotFound() {
  return (
    <MaxWidthWrapper>
      <div className="my-10 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
        <div className="rounded-full bg-gray-100 p-3">
          <FileX2 className="h-6 w-6 text-gray-600" />
        </div>
        <h1 className="my-3 text-xl font-semibold text-gray-700">
          Workspace Not Found
        </h1>
        <p className="z-10 max-w-sm text-center text-sm text-gray-600">
          Bummer! The workspace you are looking for does not exist. You either
          typed in the wrong URL or don&apos;t have access to this workspace.
        </p>
        <Image
          src="/assets/features4.svg"
          alt="No links yet"
          width={400}
          height={400}
        />
        <Link
          href="/app/workspaces"
          className="z-10 rounded-md border border-black bg-black px-10 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black">
          Back to my workspaces
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
