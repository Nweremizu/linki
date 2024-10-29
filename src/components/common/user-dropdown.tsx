/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { IconMenu } from "../ui/icon-menu";
import { LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useUser } from "@/lib/query/user/useUser";

export default function UserDropdown() {
  // const { data: session } = useSession();
  const { data: user } = useUser();
  const [openPopover, setOpenPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative inline-block pt-1.5">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <div className="group">
            {user ? (
              <Avatar className="h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10">
                <AvatarImage src={"#"} alt="User" />
                <AvatarFallback className="capitialize">
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-9 w-9 animate-pulse rounded-full border border-gray-300 bg-gray-100 sm:h-10 sm:w-10" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex w-full flex-col space-y-2 rounded-md bg-white p-3 sm:w-56">
          {user ? (
            <Link
              href="/"
              className="p-2"
              onClick={() => setOpenPopover(false)}
            >
              <p className="truncate text-sm font-medium text-gray-900">
                {user?.name || user?.email?.split("@")[0]}
              </p>
              <p className="truncate text-sm text-gray-500">{user?.email}</p>
            </Link>
          ) : (
            <div className="grid gap-2 px-2 py-3">
              <div className="h-3 w-12 animate-pulse rounded-full bg-gray-200" />
              <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>
          )}
          <Link
            href="/app/account/settings"
            onClick={() => setOpenPopover(false)}
            className="block w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
          >
            <IconMenu text="Settings" icon={<Settings className="h-4 w-4" />} />
          </Link>
          <Button
            variant={"default"}
            loading={loading}
            onClick={() => {
              setLoading(true);
              signOut({
                callbackUrl: "/login",
              })
                .then((_res) => {
                  setLoading(false);
                })
                .catch((_err) => {
                  setLoading(false);
                });
            }}
          >
            <IconMenu
              text="Logout"
              icon={!loading && <LogOut className="h-4 w-4" />}
            />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
