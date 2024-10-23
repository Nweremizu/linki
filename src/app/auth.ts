import { NextAuthOptions, User, BackendJWT, AuthValidity } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { AdapterUser } from "next-auth/adapters";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _req) {
        try {
          const axiosResponse = await axios.post(
            "http://localhost:4000/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );


          // console.debug(axiosResponse.data);

          const user = axiosResponse.data?.responseObject;


          const tokens: BackendJWT = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };

          const validity: AuthValidity = {
            valid_until: jwtDecode(user.accessToken)?.exp || 0,
            refresh_until: jwtDecode(user.refreshToken).exp || 0,
          };

          // console.log(user);

          if (axiosResponse.status === 200 && user) {
            return {
              user: {
                ...user,
              },
              tokens,
              validity,
            } as unknown as User;
          } else {
            return null;
          }
        } catch (ex) {
          return {
            error: (ex as AxiosError<{ message: string }>).response?.data
              ?.message,
          } as unknown as User;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }) {
      if (user?.error) {
        throw new Error(user?.error);
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // If the URL is part of the same origin as baseUrl, return it as is
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Otherwise, default to the baseUrl (homepage)
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        // console.log(token);
        // console.debug("Initial User:", user);
        return { ...token, data: user };
      }

      if (Date.now() < token?.data?.validity?.valid_until * 1000) {
        console.debug("Access Token is still valid");
        return token;
      }

      //The refresh token is still valid
      if (Date.now() < token?.data?.validity?.refresh_until * 1000) {
        console.debug(
          "Access Token has expired, but Refresh Token is still valid"
        );
        return await refreshAccessToken(token);
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug("Both tokens have expired");
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token }) {
      session.user = token.data.user as User["user"];
      session.validity = token.data.validity;
      session.error = token.error;
      // console.debug("Session:", session);
      return session;
    },
  },
};

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    // Request to the API Refresh Token endpoint
    const axiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        refreshToken: nextAuthJWTCookie.data.user.refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(axiosResponse?.data?.responseObject);
    const accessToken = axiosResponse?.data?.responseObject.accessToken;

    const expiry = jwtDecode(accessToken).exp || 0;
    nextAuthJWTCookie.data.validity.valid_until = expiry;
    nextAuthJWTCookie.data.user.accessToken = accessToken;
    return nextAuthJWTCookie;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.response.data);
    return { ...nextAuthJWTCookie, error: "RefreshAccessTokenError" };
  }
}

export default authOptions;
