"use client";

import { CommandPalette } from "@inbox/ui/command-palette";
import { useEffect, useState } from "react";

export function CommandPaletteWrapper() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return <CommandPalette open={open} onOpenChange={setOpen} />;
}
