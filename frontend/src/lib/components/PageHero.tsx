import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface PageHeroProps {
  backgroundImage: string;
  children: ReactNode;
  minHeight?: string; // tailwind height class, e.g. "min-h-screen" or "h-64"
}

function PageHero({
  backgroundImage,
  children,
  minHeight = "min-h-screen",
}: PageHeroProps) {
  return (
    <div
      className={`relative ${minHeight} bg-cover bg-center`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <Navbar />
      {children}
    </div>
  );
}

export default PageHero;
