# 🛠️ Troubleshooting Guide

This guide provides solutions and workarounds for common issues encountered during development, deployment, and usage of the Portfolio Web Application.

## 📋 Table of Contents

- [General Issues](#general-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [Database Issues](#database-issues)
- [Authentication Issues](#authentication-issues)
- [File Upload Issues](#file-upload-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Logging and Monitoring](#logging-and-monitoring)
- [Contact and Support](#contact-and-support)

## General Issues

### Application Not Starting

- **Symptoms**: Server or frontend does not start, crashes immediately.
- **Possible Causes**:
  - Missing environment variables
  - Port conflicts
  - Dependency installation issues
- **Solutions**:
  - Verify `.env` files are present and correctly configured.
  - Check if ports 3000 (backend) and 5173 (frontend) are free.
  - Run `npm install` to ensure dependencies are installed.
  - Check logs for error messages.

### Unexpected Crashes

- **Symptoms**: Application crashes during runtime.
- **Possible Causes**:
  - Unhandled exceptions
  - Memory leaks
  - Infinite loops
- **Solutions**:
  - Review error logs.
  - Use debugging tools and breakpoints.
  - Monitor memory usage.
  - Add error handling middleware.

## Backend Issues

### Database Connection Failure

- **Symptoms**: Backend cannot connect to MySQL database.
- **Possible Causes**:
  - Incorrect `DATABASE_URL`
  - Database server not running
  - Network/firewall issues
- **Solutions**:
  - Verify `DATABASE_URL` in `.env`.
  - Ensure MySQL server is running.
  - Test connection with MySQL client.
  - Check firewall and network settings.

### API Endpoint Not Responding

- **Symptoms**: API returns 404 or 500 errors.
- **Possible Causes**:
  - Incorrect route configuration
  - Middleware blocking requests
  - Server errors
- **Solutions**:
  - Check route definitions in `src/routes`.
  - Review middleware order.
  - Inspect server logs for stack traces.

### Authentication Failures

- **Symptoms**: Unable to login or access protected routes.
- **Possible Causes**:
  - Invalid JWT secret
  - Expired or malformed tokens
  - Incorrect credentials
- **Solutions**:
  - Verify `JWT_SECRET` in `.env`.
  - Check token expiration.
  - Reset admin password if needed.

## Frontend Issues

### UI Not Loading or Broken

- **Symptoms**: Blank page, layout issues, or errors in console.
- **Possible Causes**:
  - Build errors
  - Missing assets
  - Incorrect API base URL
- **Solutions**:
  - Run `npm run dev` or `npm run build` to check for errors.
  - Verify asset paths.
  - Check `VITE_API_BASE_URL` in `.env`.

### Form Submission Fails

- **Symptoms**: Contact form or admin forms do not submit.
- **Possible Causes**:
  - API endpoint unreachable
  - Validation errors
  - CORS issues
- **Solutions**:
  - Check network requests in browser dev tools.
  - Verify API server is running.
  - Review validation messages.
  - Configure CORS properly on backend.

## Database Issues

### Migration Failures

- **Symptoms**: `npm run db:push` or migrations fail.
- **Possible Causes**:
  - Schema conflicts
  - Database permissions
- **Solutions**:
  - Review Prisma schema.
  - Check database user permissions.
  - Reset database if needed.

### Data Inconsistencies

- **Symptoms**: Missing or incorrect data.
- **Possible Causes**:
  - Failed writes
  - Manual database changes
- **Solutions**:
  - Use Prisma Studio to inspect data.
  - Restore from backups if necessary.

## Authentication Issues

### Admin Login Not Working

- **Symptoms**: Login fails with invalid credentials.
- **Possible Causes**:
  - Incorrect admin username/password
  - Password hashing issues
- **Solutions**:
  - Reset admin password using seed script.
  - Verify password hashing configuration.

### Token Expiration

- **Symptoms**: Token expires too soon or never expires.
- **Possible Causes**:
  - Incorrect JWT expiration setting
- **Solutions**:
  - Adjust `JWT_EXPIRES_IN` in `.env`.

## File Upload Issues

### Upload Fails or Files Missing

- **Symptoms**: File uploads fail or files not found.
- **Possible Causes**:
  - Upload directory permissions
  - File size limits exceeded
  - Invalid file types
- **Solutions**:
  - Check permissions on `uploads/` directory.
  - Verify max file size settings.
  - Validate allowed file types.

### File Access Issues

- **Symptoms**: Uploaded files not accessible via URL.
- **Possible Causes**:
  - Static file serving misconfiguration
  - Incorrect file paths
- **Solutions**:
  - Ensure Express static middleware is configured.
  - Verify file URLs.

## Deployment Issues

### Build Failures

- **Symptoms**: Deployment fails during build.
- **Possible Causes**:
  - Missing dependencies
  - Environment variable issues
- **Solutions**:
  - Check build logs.
  - Verify environment variables.

### Environment Mismatch

- **Symptoms**: App behaves differently in production.
- **Possible Causes**:
  - Different environment variables
  - Caching issues
- **Solutions**:
  - Compare `.env` files.
  - Clear caches and restart services.

## Performance Issues

### Slow API Responses

- **Symptoms**: API takes too long to respond.
- **Possible Causes**:
  - Database query inefficiencies
  - High server load
- **Solutions**:
  - Optimize database queries.
  - Add indexes.
  - Scale server resources.

### Slow Frontend Load

- **Symptoms**: Frontend loads slowly.
- **Possible Causes**:
  - Large bundle size
  - Unoptimized images
- **Solutions**:
  - Use code splitting.
  - Optimize images.
  - Use CDN.

## Logging and Monitoring

### Logs Not Showing

- **Symptoms**: No logs in console or files.
- **Possible Causes**:
  - Logger misconfiguration
- **Solutions**:
  - Check logger setup.
  - Verify log levels.

### Monitoring Alerts

- **Symptoms**: Missing or excessive alerts.
- **Possible Causes**:
  - Incorrect monitoring thresholds
- **Solutions**:
  - Adjust alert thresholds.
  - Review monitoring configuration.

## Contact and Support

For further assistance, please:

- Check the [GitHub Issues](https://github.com/yourusername/web-portofolio/issues)
- Review the [Documentation](./README.md)
- Contact the project maintainer at your-email@example.com

---

This troubleshooting guide will be updated regularly to address new issues and solutions.
