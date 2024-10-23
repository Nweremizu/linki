"use-client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface AvatarUserProps {
  id?: string;
  name: string;
  image?: string;
  className?: string;
}

export default function AvatarUser({
  id,
  name,
  image,
  className,
}: AvatarUserProps) {
  return (
    <Avatar className={cn("h-6 w-6", className)} data-id={id}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="capitalize">{name[0]}</AvatarFallback>
    </Avatar>
  );
}
