"use client";

import { useEffect, useState } from "react";

function formatDate(date: Date) {
  return date.toLocaleDateString("no-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function LiveDateBadge() {
  const [label, setLabel] = useState("I dag");

  useEffect(() => {
    const updateLabel = () => setLabel(formatDate(new Date()));

    updateLabel();
    const timer = window.setInterval(updateLabel, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return <span>{label}</span>;
}
