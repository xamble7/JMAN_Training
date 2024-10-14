import { toast } from "@/hooks/use-toast";
import { prisma } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { DefaultSession, DefaultUser, Session, User } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    role: string;
  }
}

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  console.log(await bcrypt.compare(plainPassword, hashedPassword) )
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.users.findUnique({
          where: { email: credentials!.email },
          include: {
            employees: true,
          },
        });
        if (!user) {
          toast({ title: "No such user found" });
          return null;
        }

        const isValid = await validatePassword(
          credentials!.password,
          user!.password
        );

        if (!isValid) {
          toast({ title: "Incorrect Password" });
          return null;
        }
        return {
          id: user!.empid,
          role: user!.role,
          name: user!.employees.empname,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role!;
        token.name = user.name!;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email!;
      }
      return session;
    },
    async signOut({ session, token }: { session: Session; token: JWT }) {
      token.id = "";
      token.role = "";
      token.name = "";
      token.email = "";
      // session.user.id = token.id;
      // session.user.role = token.role;
      // session.user.name = token.name;
      // session.user.email = token.email!;
    },
  },
};
