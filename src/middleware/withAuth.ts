import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

import { MiddlewareFactory, currentLocale } from '@/middleware/util'

export const withAuth: MiddlewareFactory = (next) => {
  return async (req: NextRequest, event) => {
    const locale = currentLocale(req)

    // Auth is not required for auth callback routes
    if (req.nextUrl.pathname.startsWith(`/${locale}/auth/`)) {
      console.log('auth: skip', req.nextUrl.pathname)
      return next(req, event)
    }

    // Await response object required by supabase client
    const res = await next(req, event)
    
    // Cast response to expected type for supabase
    const _res = res as NextResponse<unknown>
    
    // Create supabase client for auth
    // TODO pass Database type to client constructor
    const supabase = createMiddlewareClient({ req, res: _res  })
    
    // Get auth user from supabase client. If null, user is not logged in.
    const { data: { user } } = await supabase.auth.getUser()
    console.log('auth: user', user)

    // if user is signed in and the current path is /<locale> redirect the user to /<locale>/dashboard
    if (user && req.nextUrl.pathname === `/${locale}`) {
      console.log('auth: user is signed in, redirect to dashboard')
      return NextResponse.redirect(new URL(`${locale}/dashboard`, req.url))
    }

    // if user is not signed in and the current path is not /<locale> redirect the user to /<locale>
    if (!user && req.nextUrl.pathname !== `/${locale}`) {
      console.log('auth: user is not signed in, redirect to sign in page')
      return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    console.log('auth: noop')
    return res
  }
}