import { NextRequest, NextResponse } from "next/server";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  const username =
    request.nextUrl.searchParams.get("username") || "Hashim017";

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API returned ${res.status}` },
        { status: res.status }
      );
    }

    const repos: GithubRepo[] = await res.json();

    const simplified = repos.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({ username, repos: simplified });
  } catch (error) {
    console.error("[GET /api/github]", error);
    return NextResponse.json(
      { error: "Failed to reach GitHub" },
      { status: 500 }
    );
  }
}