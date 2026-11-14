import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Provider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureAuth",
  description: "Autenticación y seguridad con NextAuth.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const initial = (user?.name ?? user?.email ?? "U").charAt(0).toUpperCase();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <nav className="h-[72px] w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto h-full max-w-6xl px-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              SecureAuth
            </Link>
            <ul className="flex items-center gap-5 text-sm">
              {user ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-slate-300 hover:text-emerald-400 transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="text-slate-300 hover:text-emerald-400 transition"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                  <li>
                    {user.image ? (
                      <Image
                        height={40}
                        width={40}
                        src={user.image}
                        alt="Perfil"
                        className="h-10 w-10 rounded-full ring-2 ring-emerald-500"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950">
                        {initial}
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signIn"
                      className="text-slate-300 hover:text-emerald-400 transition"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:opacity-90 transition"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}