"use client";

import dynamic from "next/dynamic";

const GameApp = dynamic(() => import("@/components/GameApp"), {
  ssr: false,
  loading: () => <div className="boot">OPOS</div>,
});

export default function HomePage() {
  return <GameApp />;
}
