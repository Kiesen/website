
# Image for build phase 
FROM node:latest AS build
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN BUILD="true" npm install
RUN npm run build
RUN rm -rf node_modules
RUN BUILD="true" npm ci --only=production


# Image for app execution
FROM node:lts-alpine@sha256:2ae9624a39ce437e7f58931a5747fdc60224c6e40f8980db90728de58e22af7c
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/.next /usr/src/app/.next
COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app
EXPOSE 3001
CMD ["dumb-init", "npm", "run", "start"]