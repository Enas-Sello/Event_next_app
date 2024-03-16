import { NextRequest } from "next/server"
interface SessionBase {
  user: {
    id: string
    isAdmin: boolean
  }
}
interface TokenBase {
  id: string
  isAdmin: boolean
}

interface AuthConfig {
  pages: {
    signIn: string
  }
  providers: any[] 
  callbacks: {
    jwt: (params: { token: TokenBase; user: any }) => Promise<TokenBase>
    session: (params: {
      session: SessionBase
      token: TokenBase
    }) => Promise<SessionBase>
    authorized: (params: {
      auth: any
      request: NextRequest
    }) => boolean | Response
  }
}

export const authConfig: AuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    authorized({ auth, request }) {
      const user = auth?.user
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
      const isOnEventPage = request.nextUrl?.pathname.startsWith("/events")
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      // if (isOnEventPage && !user) {
      //   return false
      // }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        // Assuming you have imported Response, you might want to import it properly
        return Response.redirect(new URL("/", request.nextUrl))
      }

      return true
    },
  },
}
