import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const initial = (user?.name ?? user?.email ?? "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
          <div className="px-8 pb-8">
            <div className="-mt-12">
              {user?.image ? (
                <Image
                  height={96}
                  width={96}
                  src={user.image}
                  alt="Perfil"
                  className="h-24 w-24 rounded-full ring-4 ring-slate-900"
                />
              ) : (
                <div className="h-24 w-24 rounded-full ring-4 ring-slate-900 bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-slate-950">
                  {initial}
                </div>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-100">
              {user?.name ?? "Sin nombre"}
            </h1>
            <p className="text-slate-400">{user?.email}</p>

            <div className="mt-8 space-y-3">
              <div className="flex justify-between rounded-xl bg-slate-950 px-5 py-4 border border-slate-800">
                <span className="text-slate-400">Nombre</span>
                <span className="font-medium text-slate-100">
                  {user?.name ?? "-"}
                </span>
              </div>
              <div className="flex justify-between rounded-xl bg-slate-950 px-5 py-4 border border-slate-800">
                <span className="text-slate-400">Correo</span>
                <span className="font-medium text-slate-100">
                  {user?.email ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}