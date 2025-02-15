
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) {
//           throw new Error("Invalid email or password");
//         }

//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValidPassword) {
//           throw new Error("Invalid email or password");
//         }

//         // Return user data, including userId
//         return {
//           id: user.id, // Add user ID here
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Custom login page
//   },
//   session: {
//     strategy: "jwt", // Use JWT for session management
//   },
//   callbacks: {
//     async session({ session, user }) {
//       // Check if user is present and add userId to the session
//       if (user) {
//         console.log("user", user);
//         session.user.id = user.id; // Ensure userId is added to session
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return user data, including userId
        return {
          id: user.id, // Add user ID here
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // When user logs in, add the id to the token
      if (user) {
        token.id = user.id; // Store user.id in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      // When session is created, add the id from token to the session
      if (token?.id) {
        session.user.id = token.id; // Add userId to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

