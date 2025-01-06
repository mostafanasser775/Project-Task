"use client";
import React from "react";
import { InputOtp } from "@nextui-org/input-otp";

export function OtpLogin() {
    const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-2 w-full max-w-[240px]">
      <InputOtp length={4} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-small">value: {value}</p>
    </div>
  );
}
