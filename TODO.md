# TODO: Enhance Backend for Google Colab Links and Java/Android Project Uploads

## 1. Database Schema Enhancement
- [x] Add `files` JSON field to `Project` model in `backend/prisma/schema.prisma`
- [x] Run Prisma migration: `npx prisma migrate dev --name add-files-field`

## 2. File Upload Support
- [x] Install `multer` dependency: `npm install multer`
- [x] Update `backend/src/utils/validator.ts`: Allow flexible JSON for `links` (include "colab" type), `files`, `images`, and "Java"/"Android" in `tech`
- [x] Update `backend/src/routes/projects.routes.ts`: Add multer middleware to create/update routes for multipart/form-data
- [x] Update `backend/src/controllers/projects.controller.ts`: Handle file parsing, upload logic, append paths to `images` and `files` JSON

## 3. Service Updates
- [ ] Review `backend/src/services/projects.service.ts`: Ensure JSON fields are handled properly (likely no changes needed)

## 4. Testing and Verification
- [ ] Test Google Colab link addition via API (POST/PUT with `links` JSON)
- [ ] Test file upload (e.g., ZIP for Java/Android) via API
- [ ] Verify static file serving from `/uploads`
- [ ] Restart server: `npm run dev` to apply changes
