"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signIn" })}
      className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200 hover:border-rose-500 hover:text-rose-400 transition"
    >
      Cerrar sesión
    </button>
  );
}