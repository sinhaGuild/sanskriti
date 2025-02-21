import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getListOfPathnames = (fullpath: string) => {
  return fullpath.split("/")
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));