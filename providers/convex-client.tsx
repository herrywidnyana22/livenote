"use client"

import { Loading } from "@/app/auth/loading"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { AuthLoading, ConvexReactClient, Authenticated } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"


interface ConvexClientProps{
    children: React.ReactNode
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexURL)

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export const ConvexClient = ({children}: ConvexClientProps) =>{
    return(
        <ClerkProvider publishableKey={publishableKey}>
            <ConvexProviderWithClerk
                client={convex}
                useAuth={useAuth}
            >
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading/>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}