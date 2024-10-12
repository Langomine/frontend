import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
})

export const Route = createRootRoute({
    component: () => (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <TanStackRouterDevtools />
        </>
    ),
})