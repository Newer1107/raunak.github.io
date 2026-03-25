# CivicResolve Monorepo

CivicResolve is a civic issue reporting and resolution platform with:

- A Flutter mobile app in this repository root
- A Next.js full-stack web app and API in CivicResolve/

The platform supports citizen issue reporting, map-based discovery, organization assignment workflows, analytics, AI-assisted reporting/analysis, appeals, duplicate detection, and role-based administration.

## Repository Layout

- lib/ - Flutter mobile app source
- test/ - Flutter widget tests
- android/ - Flutter Android project files
- CivicResolve/ - Next.js web app + API + DB integration
- CivicResolve/docs/ - Feature-specific architecture and implementation docs
- test_anonymous_api.md - Anonymous reporting verification notes

## Tech Stack

### Mobile App (Flutter)

- Flutter, Dart, Provider
- Dio for API networking
- flutter_map + geolocator for location workflows
- image_picker + image_cropper for report images

### Web/API (Next.js)

- Next.js 15 (App Router), TypeScript
- MySQL (mysql2)
- JWT auth + middleware route protection
- Redis caching (optional but supported)
- Gemini integrations for AI features

## Main Features Present in Codebase

- Citizen issue reporting (manual + AI-assisted flow)
- Issue lifecycle tracking: PENDING, IN_PROGRESS, RESOLVED, REJECTED, appeal/duplicate flows
- Organization dashboards, member assignment, and my-issues workflow
- Map-based issue visualization and location picker
- Analytics and admin surfaces
- Email notifications and role-aware workflows
- Security hardening and environment validation on web/API side

## Prerequisites

- Flutter SDK (compatible with Dart 3.11 from pubspec constraints)
- Node.js 20+ (recommended for Next.js 15)
- Package manager for web app (pnpm preferred, npm works)
- MySQL database for the web/API app
- Redis (optional, for cache features)

## Quick Start

### 1) Run the Next.js Web/API App

1. Go to CivicResolve/
2. Install dependencies
3. Create a .env.local with required variables
4. Start dev server

Example commands (PowerShell):

```powershell
cd CivicResolve
pnpm install
pnpm dev
```

If you use npm:

```powershell
cd CivicResolve
npm install
npm run dev
```

Default dev URL: http://localhost:3000

### Required Environment Variables (Web/API)

Based on runtime validation in CivicResolve/lib/env.ts and CivicResolve/lib/env-validation.ts:

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET (minimum 32 chars)

Common optional variables:

- NEXTAUTH_URL
- NEXTAUTH_SECRET
- NEXT_PUBLIC_APP_URL
- GOOGLE_AI_API_KEY and/or GEMINI_API_KEY
- REDIS_URL or REDIS_HOST/REDIS_PORT/etc.
- CORS_ORIGIN

### 2) Run the Flutter Mobile App

From repository root:

```powershell
flutter pub get
flutter run
```

The Flutter app defaults to:

- API_BASE_URL = http://10.0.2.2:3000

Override API base URL when running:

```powershell
flutter run --dart-define=API_BASE_URL=http://<your-machine-ip>:3000
```

Other supported dart defines:

- PRODUCTION=true|false

## Useful Commands

### Flutter (repo root)

```powershell
flutter analyze
flutter test
```

### Next.js app (CivicResolve/)

```powershell
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm type-check
```

## API and App Surfaces

### Flutter routes (selected)

- /issues
- /issue/:id
- /report
- /ai-report
- /map
- /my-issues
- /org-dashboard
- /analytics
- /admin-duplicates

### Next.js app routes (selected folders)

- app/issues/
- app/report/
- app/map/
- app/my-issues/
- app/organization/
- app/admin/
- app/api/

## Database and Docs

- Schema references: CivicResolve/database-schema.sql and CivicResolve/database-schema.txt
- Architecture and feature docs: CivicResolve/docs/

Recommended starting docs:

- CivicResolve/docs/COMPLETE_SYSTEM_ARCHITECTURE.md
- CivicResolve/docs/AI_AUTO_FILL.md
- CivicResolve/docs/AI_IMAGE_ANALYSIS.md
- CivicResolve/docs/DUPLICATE_DETECTION_README.md
- CivicResolve/docs/REDIS_SETUP.md

## Notes

- The root project is not a simple Flutter starter anymore; it is a multi-app civic platform workspace.
- Build artifacts under build/ are generated output and should not be manually edited.
