import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name ?? session?.user?.email;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-10">
          <p className="text-emerald-100 text-sm uppercase tracking-widest">
            Panel principal
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white">
            Hola, {name}
          </h1>
          <p className="mt-3 text-emerald-50 max-w-xl">
            Tu sesión está activa y protegida. Aquí puedes ver el estado de tu
            cuenta.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Estado</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-400">
              Sesión activa
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Correo</p>
            <p className="mt-2 text-lg font-semibold text-slate-100 break-all">
              {session?.user?.email}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Protección</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">
              Bcrypt + bloqueo por intentos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}