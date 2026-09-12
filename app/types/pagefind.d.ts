declare module "/pagefind/pagefind.js" {
  type PagefindResult = {
    id: string;
    data: () => Promise<{ url: string }>;
  };

  export function search(query: string): Promise<{ results: PagefindResult[] }>;
}
