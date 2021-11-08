
# Image for build phase 
FROM node:latest AS build
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN BUILD="true" npm install
RUN npm run build
RUN rm -rf node_modules

# Image for app execution
FROM node:lts-alpine@sha256:7001ff8aabeabe8844ef8e7613afaf723e832e19fba55bf1b9929739c7723ece
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/.next /usr/src/app/.next
COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app/package-lock.json /usr/src/app/
RUN BUILD="true" npm ci --only=production
EXPOSE 3001
CMD ["dumb-init", "npm", "run", "start"]