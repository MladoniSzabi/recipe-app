FROM node:18.13.0-alpine
WORKDIR /frontend
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
RUN rm next.config.js
RUN npx next build
CMD npx next start