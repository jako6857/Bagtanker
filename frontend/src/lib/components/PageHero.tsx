import type { ReactNode } from "react";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";

interface PageHeroProps {
  backgroundImage: string;
  children: ReactNode;
  minHeight?: string;
}

function PageHero({
  backgroundImage,
  children,
  minHeight = "min-h-screen",
}: PageHeroProps) {
  return (
    <div>
      <div
        className={`relative ${minHeight} bg-cover bg-center`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-slate-900/45" />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </div>
      <CategoryNav />
    </div>
  );
}

export default PageHero;
