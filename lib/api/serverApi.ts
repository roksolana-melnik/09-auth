import { cookies } from "next/headers";
import axios from "axios";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

const serverAxios = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

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
  const { data } = await serverAxios.get<FetchNotesResponse>("/notes", {
    params: queryParams,
    headers,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getHeaders();
  const { data } = await serverAxios.get<Note>(`/notes/${id}`, { headers });
  return data;
}

export async function getMe(): Promise<User> {
  const headers = await getHeaders();
  const { data } = await serverAxios.get<User>("/users/me", { headers });
  return data;
}

export async function checkSession(): Promise<import('axios').AxiosResponse<User | null>> {
  const headers = await getHeaders();
  return serverAxios.get<User | null>("/auth/session", { headers });
}
