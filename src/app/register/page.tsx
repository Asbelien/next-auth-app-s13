"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "No se pudo crear la cuenta");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid lg:grid-cols-2 bg-slate-950 text-slate-100">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600">
        <span className="text-2xl font-bold tracking-tight">SecureAuth</span>
        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Crea tu cuenta
            <br />
            en segundos.
          </h2>
          <p className="mt-4 text-emerald-100 max-w-sm">
            Tu contraseña se cifra con bcrypt antes de guardarse. Nadie, ni
            nosotros, puede leerla.
          </p>
        </div>
        <span className="text-sm text-emerald-100">NextAuth.js + Prisma</span>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p className="mt-2 text-slate-400">Completa tus datos para empezar</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="Tu nombre"
              />
            </div>
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
                minLength={8}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="Repite tu contraseña"
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/signIn" className="text-emerald-400 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}