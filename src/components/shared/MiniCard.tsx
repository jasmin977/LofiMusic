import React, { ReactNode } from "react";

interface MiniCardProps {
  children: ReactNode;
  title: string;
}
function MiniCard({ children, title }: MiniCardProps) {
  return (
    <div className="bg-[#312b25c2] flex flex-col p-2 px-4 rounded-md border gap-2 border-[#4d4337]">
      <span className="font-semibold text-white uppercase">{title}</span>
      {children}
    </div>
  );
}

export default MiniCard;
