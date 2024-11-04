export type Link = {
  id: string;
  key: string;
  url: string;
  title: string | null;
  description: string | null;
  clicks: number;
  lastClicked: Date;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  workspaceId: string;
  userId: string;
  comments: string | null;
  expiresAt?: Date;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
};

export type LinkProps = Link;

export interface LinkWithTagsProps extends LinkProps {
  tags: TagProps[];
}

export interface TagProps {
  id: string;
  name: string;
  color: TagColorProps;
}

export type TagColorProps = (typeof tagColors)[number];

export const tagColors = [
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
] as const;

export interface ClickData {
  clicks: number;
  click_id: string;
  link_id: string;
  timestamp: string;
  city: string;
  device: string;
  ip: string;
  url: string;
}

export interface CountryClickData {
  clicks: number;
  country: string;
}

export interface CityClickData {
  clicks: number;
  city: string;
  country: string;
}

export interface ContintentClickData {
  clicks: number;
  continent: string;
}
