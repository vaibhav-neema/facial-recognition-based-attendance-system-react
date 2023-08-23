import { useState } from "react";

export const useTeamInfo = (init = false) => {
  const [isOpen, setIsOpen] = useState(init);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
};
