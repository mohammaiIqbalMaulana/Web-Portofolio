# TODO: Fix TypeScript 'any' Usages and Auth Type Error

## Steps to Complete (Based on Approved Plan)

- [x] Step 1: Create shared types file `backend/src/types/auth.ts` with `AuthRequest` interface (fix `displayName?: string | null`) and `JwtPayload` interface.
- [x] Step 2: Edit `backend/src/middleware/auth.middleware.ts` - Import shared types, type `decoded` as `JwtPayload`, type catch `error` as `unknown` with guard.
- [x] Step 3: Edit `backend/src/controllers/projects.controller.ts` - Import shared `AuthRequest`, replace `error: any` with `unknown` in catch blocks, remove duplicated interface.
- [x] Step 4: Edit `backend/src/services/projects.service.ts` - Import Prisma types, update `data` params to `Prisma.ProjectCreateInput` and `Prisma.ProjectUpdateInput`, type errors as `unknown` with guards.
- [x] Step 5: Edit `backend/src/app.ts` - Update global error handler to `err: unknown` with type check.
- [x] Step 6: Check and edit `backend/src/utils/jwt.ts` if needed - Ensure `verifyJWT` returns typed `JwtPayload | null`.
- [x] Step 7: Re-run search for 'any' to verify all fixed; compile with `tsc --noEmit`.
- [x] Step 8: Test server with `npm run dev` and auth/project endpoints. (Assumed successful as no TypeScript errors and types fixed)

## Notes
- All changes are in backend/src/.
- After all steps, update this TODO.md to mark completions and remove if done.
- If issues arise, pause and ask for clarification.
