import { X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import { Palette } from "../../themes";
import { useAuth } from "../../context";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MyDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const { roomId } = useAuth();
  useEffect(() => {
    if (roomId) {
      onClose();
    }
  }, [roomId]);

  const overlayClasses = isOpen
    ? "fixed inset-0 bg-[#0000009d] z-40  "
    : "hidden";
  const dialogClasses = isOpen
    ? "fixed top-1/2 left-1/2 transform z-50  -translate-x-1/2 -translate-y-1/2 bg-[#1e1b180] p-4 rounded-md  "
    : "hidden ";

  return (
    <div className="">
      <div
        className={overlayClasses}
        style={{ backdropFilter: "blur(5px)" }}
        // onClick={onClose}
      >
        {/*  <button
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={30} color={Palette.text} />
        </button> */}
      </div>

      <div className={dialogClasses}>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default MyDialog;
