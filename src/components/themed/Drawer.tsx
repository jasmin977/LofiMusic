import React, { ReactNode, useState } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const overlayClasses = isOpen ? "fixed inset-0 bg-[#0000009d]   " : "hidden";

  return (
    <div>
      <div
        className={overlayClasses}
        style={{ backdropFilter: "blur(5px)" }}
        onClick={onClose}
      ></div>
      <div
        className={`fixed inset-y-0 right-0 bg-[#1E1B18] text-white p-4 w-64 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform ease-in-out duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
