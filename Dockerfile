FROM node:14.2-alpine AS base
ENV NODE_ENV=development
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install
COPY --chown=node:node . .
RUN yarn build
CMD ["node", "dist/index.js"]

FROM node:14.2-alpine AS prd
ENV NODE_ENV=production
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --from=base --chown=node:node /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean
COPY --from=base /app/dist ./dist
CMD ["node", "dist/index.js"]
