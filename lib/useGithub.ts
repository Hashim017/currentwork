"use client";

import { useQuery } from "@tanstack/react-query";

export interface GithubRepoSummary {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
}

async function fetchRepos(username: string): Promise<GithubRepoSummary[]> {
  const res = await fetch(`/api/github?username=${username}`);
  if (!res.ok) throw new Error("Couldn't load repositories");
  const data = await res.json();
  return data.repos;
}

export function useGithubRepos(username: string) {
  return useQuery({
    queryKey: ["github-repos", username],
    queryFn: () => fetchRepos(username),
    staleTime: 5 * 60_000,
  });
}