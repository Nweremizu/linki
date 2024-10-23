import { z } from "zod";

export const addTagSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.enum(["red", "yellow", "green", "blue", "purple", "pink", "brown"]),
});
