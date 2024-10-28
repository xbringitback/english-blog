import prisma from "@/libs/prismadb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Überprüfen, ob der Benutzer eine gültige E-Mail hat
      if (!user.email) {
        return false; // Abbrechen, wenn keine E-Mail vorhanden ist
      }

      // Überprüfen, ob der Benutzer in der Datenbank vorhanden ist
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }, // Hier verwenden wir die E-Mail
      });

      // Wenn der Benutzer nicht vorhanden ist, dann neu in DB erstellen
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            roles: user.email === process.env.ADMIN_EMAIL ? "admin" : "user", // Rolle basierend auf der E-Mail festlegen
          },
        });
      }

      return true; // Damit der Benutzer weiter eingeloggt bleibt
    },

    async session({ session, token }) {
      // Rolle aus dem Token in die Session übernehmen
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },

    async jwt({ token, user }) {
      // Benutzer aus der Datenbank abfragen und die Rolle setzen
      if (user && user.email) {
        // Überprüfen, ob der Benutzer eine E-Mail hat
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.role = dbUser?.roles || "user"; // Rolle setzen, standardmäßig 'user'
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
