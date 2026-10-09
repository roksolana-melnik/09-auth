import api from "./api";
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { tag, ...rest } = params;
  const queryParams = tag && tag !== "all" ? { ...rest, tag } : rest;
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function register(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>("/auth/register", credentials);
  return data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<{ success: boolean }> {
  const { data } = await api.get<{ success: boolean }>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(userData: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
}
