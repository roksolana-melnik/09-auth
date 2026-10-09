import { cookies } from "next/headers";
import api from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

async function getHeaders() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const headers = await getHeaders();
  const { tag, ...rest } = params;
  const queryParams = tag && tag !== "all" ? { ...rest, tag } : rest;
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: queryParams,
    headers,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
}

export async function getMe(): Promise<User> {
  const headers = await getHeaders();
  const { data } = await api.get<User>("/users/me", { headers });
  return data;
}

export async function checkSession(): Promise<{ success: boolean }> {
  const headers = await getHeaders();
  const { data } = await api.get<{ success: boolean }>("/auth/session", { headers });
  return data;
}
