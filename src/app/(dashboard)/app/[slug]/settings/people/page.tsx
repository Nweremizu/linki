/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWorkspace, useWorkspaceUsers } from "@/lib/query/use-workspace";
import { useSession } from "next-auth/react";
import { useState } from "react";

const tabs: Array<"Members" | "Invitations"> = ["Members", "Invitations"];

export default function Page() {
  const { data: workspace } = useWorkspace();
  const { data: users, isLoading } = useWorkspaceUsers(workspace?.id as string);
  const [currentTab, setCurrentTab] = useState<"Members" | "Invitations">(
    "Members"
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col items-center justify-between space-y-3 p-5 sm:flex-row sm:space-y-0 sm:p-10">
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-medium">People</h2>
          <p className="text-sm text-gray-500">
            Teammates that have access to this workspace.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            // onClick={() => setShowInviteTeammateModal(true)}
            className="h-9"
            disabled

            // disabledTooltip={
            //   clientAccessCheck({
            //     action: "workspaces.write",
            //     role,
            //     customPermissionDescription: "invite new teammates",
            //   }).error || undefined
            // }
          >
            Invite
          </Button>
        </div>
      </div>
      <div className="flex space-x-3 border-b border-gray-200 px-3 sm:px-7">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${
              tab === currentTab ? "border-black" : "border-transparent"
            } border-b py-1`}
          >
            <button
              onClick={() => setCurrentTab(tab)}
              className="rounded-md px-3 py-1.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
      <div className="grid divide-y divide-gray-200">
        {!isLoading &&
          users &&
          users.map((user) => (
            <UserCard key={user.id} user={user} currentTab={currentTab} />
          ))}
      </div>
    </div>
  );
}

const UserCard = ({ user, currentTab }: { user: any; currentTab: string }) => {
  const { id, name, email, role } = user;
  const { data: session } = useSession();
  return (
    <div
      key={id}
      className="flex items-center justify-between space-x-3 px-4 py-3 sm:pl-8"
    >
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10">
            <AvatarImage src={"#"} alt="User" />
            <AvatarFallback className="capitialize">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{name || email}</h3>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>

        {/* {expiredInvite && <Badge variant="gray">Expired</Badge>} */}
      </div>
      <div className="flex items-center gap-x-3">
        {currentTab === "Members" && session?.user?.email === email ? (
          <p className="text-xs capitalize text-gray-500">{role}</p>
        ) : (
          <p>{role}</p>
        )}
      </div>
    </div>
  );
};
