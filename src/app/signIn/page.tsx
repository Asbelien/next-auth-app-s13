"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

const messages: Record<string, string> = {
  MISSING_FIELDS: "Completa tu correo y contraseña",
  INVALID_CREDENTIALS: "Correo o contraseña incorrectos",
  ACCOUNT_LOCKED:
    "Cuenta bloqueada por demasiados intentos fallidos. Intenta de nuevo en 15 minutos",
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(messages[result.error] ?? "No se pudo iniciar sesión");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid lg:grid-cols-2 bg-slate-950 text-slate-100">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <span className="text-2xl font-bold tracking-tight">SecureAuth</span>
        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Acceso seguro,
            <br />
            sin complicaciones.
          </h2>
          <p className="mt-4 text-emerald-100 max-w-sm">
            Inicia sesión con tu correo, Google o GitHub. Tus contraseñas se
            guardan cifradas.
          </p>
        </div>
        <span className="text-sm text-emerald-100">NextAuth.js + Prisma</span>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
          <p className="mt-2 text-slate-400">Ingresa tus datos para continuar</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-sm px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-slate-950 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-slate-500 text-sm">
            <div className="h-px flex-1 bg-slate-800" />
            o continúa con
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-3 hover:border-emerald-500 transition"
            >
              <FaGoogle /> Google
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-3 hover:border-emerald-500 transition"
            >
              <FaGithub /> GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-slate-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}