import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(
  imageName: string | null | undefined,
  folder: "users" | "books" = "users"
) {
  if (!imageName) return "";
  if (imageName.startsWith("http") || imageName.startsWith("blob:"))
    return imageName;
  return `${import.meta.env.VITE_BACKEND_URL}/images/${folder}/${imageName}`;
}
