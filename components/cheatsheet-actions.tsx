"use client";

import { Bookmark, Download, Printer, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheatSheetActions({ title }: { title: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  function downloadPdf() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={bookmarked ? "default" : "outline"} onClick={() => setBookmarked((value) => !value)}>
        <Bookmark className="h-4 w-4" />
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </Button>
      <Button variant="outline" onClick={share}>
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button variant="outline" onClick={downloadPdf}>
        <Download className="h-4 w-4" />
        PDF
      </Button>
      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="h-4 w-4" />
        Print
      </Button>
    </div>
  );
}
