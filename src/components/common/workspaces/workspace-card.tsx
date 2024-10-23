import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Workspace } from "@/lib/query/useWorkspaces";

export default function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
      <CardContent className="flex items-center h-full w-full p-4">
        <Link
          href={`/app/${workspace?.project?.slug}`}
          className="flex items-center h-full w-full">
          <Avatar>
            <AvatarImage
              src={workspace?.project?.logo}
              alt={workspace?.project?.name}
            />
            <AvatarFallback className="capitalize">
              {workspace?.project ? workspace.project.name[0] : ""}{" "}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-4">
            <h2 className="text-lg font-semibold capitalize">
              {workspace?.project?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {`app/${workspace?.project?.slug}`}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
