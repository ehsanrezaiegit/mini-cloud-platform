"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <Send className="size-4" />
          Post
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <Share2 className="size-4" />
          Share
        </a>
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
