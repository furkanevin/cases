import React from "react";
import Button from "@/components/ui/Button";
import { FiArrowLeft } from "react-icons/fi";

type BackButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  text?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  href = "..",
  variant = "primary",
  className = "",
  text = "Back to Search",
}) => {
  return (
    <Button href={href} variant={variant} className={className}>
      <FiArrowLeft className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
};

export default BackButton;
