# Build phase
FROM oven/bun:latest AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

# Production phase
FROM node:lts-alpine
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node --from=build /app/.output /home/node/app/.output
EXPOSE 3000
CMD ["dumb-init", "node", ".output/server/index.mjs"]
