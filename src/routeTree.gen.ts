/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ResultsUuidLazyImport = createFileRoute('/results/$uuid')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ResultsUuidLazyRoute = ResultsUuidLazyImport.update({
  path: '/results/$uuid',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/results.$uuid.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/results/$uuid': {
      id: '/results/$uuid'
      path: '/results/$uuid'
      fullPath: '/results/$uuid'
      preLoaderRoute: typeof ResultsUuidLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/results/$uuid': typeof ResultsUuidLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/results/$uuid': typeof ResultsUuidLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/results/$uuid': typeof ResultsUuidLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/results/$uuid'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/results/$uuid'
  id: '__root__' | '/' | '/results/$uuid'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ResultsUuidLazyRoute: typeof ResultsUuidLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ResultsUuidLazyRoute: ResultsUuidLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/results/$uuid"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/results/$uuid": {
      "filePath": "results.$uuid.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
