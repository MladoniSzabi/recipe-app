FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8000
ENV HOST 0.0.0.0
EXPOSE 8000
RUN sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"