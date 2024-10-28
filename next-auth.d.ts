// src/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Rolle hinzufügen
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    roles: string; // Rollen hinzufügen
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Rolle hinzufügen
  }
}
