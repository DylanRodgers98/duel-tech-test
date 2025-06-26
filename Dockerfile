# Install all dependencies
FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Install production dependencies only
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Build project
FROM base AS build
WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY src ./src
RUN yarn build

# Combine production only dependencies with built project
FROM node:lts-alpine AS final
WORKDIR /app
COPY --from=deps app/node_modules ./node_modules
COPY --from=build app/build ./build
COPY --from=build app/package.json package.json
ENV NODE_ENV=production
CMD ["yarn", "start"]