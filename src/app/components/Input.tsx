"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

type InputProps = {
  className?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: JSX.Element;
  title?: string;
  onSubmit?: () => void;
  textCenter?: boolean;
  error: boolean;
};

export default function Input({
  className,
  placeholder,
  type = "text",
  autoComplete = "off",
  value,
  onChange,
  icon,
  title,
  onSubmit,
  textCenter,
  error,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form
      className={`w-full flex items-center py-3 rounded-lg ${
        isFocused ? "border-black" : "border-black-300"
      } ${className ? className : null}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
    >
      {title && <div className="mr-3 opacity-50">{title}</div>}
      <input
        className={`border-none bg-transparent outline-none text-black flex-1 ${
          textCenter ? "text-center" : null
        }`}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          borderBottom: `2px solid ${error ? "red" : "black"}`,
          boxShadow: "none",
          borderWidth: isFocused ? "2px" : "1px",
        }}
      />
    </form>
  );
}
