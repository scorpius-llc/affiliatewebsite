# Use the unprivileged Nginx image for better security (runs as non-root)
FROM nginxinc/nginx-unprivileged:alpine

# Copy the custom secure Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files to the web root
# The unprivileged image uses /usr/share/nginx/html by default
COPY --chown=nginx:nginx . /usr/share/nginx/html

# The unprivileged image listens on port 8080 by default
EXPOSE 8080

# Healthcheck to ensure the server is running
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
