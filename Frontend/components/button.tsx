import React from "react";

interface Props {
  text: string;
  width?: string; // Changed from String to string
}

const Button: React.FC<Props> = ({ text, width = "w-4/12" }: Props) => {
  return (
    <div>
      <button
        className={`bg-button_c hover:bg-button_c_hover text-white py-2 px-4 rounded-lg ${width}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
