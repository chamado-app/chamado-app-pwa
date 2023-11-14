###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

ARG API_URL

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile --no-script

USER $user

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node postcss.config.cjs ./
COPY --chown=node:node index.html ./
COPY --chown=node:node quasar.config.js ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node .eslintrc ./
COPY --chown=node:node .eslintignore ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

ENV NODE_ENV production

ENV API_URL $API_URL

RUN yarn build

USER $user

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node server.js .
COPY --chown=node:node --from=build /usr/src/app/dist/spa /usr/src/app/dist/spa
COPY --chown=node:node --from=development /usr/src/app/package.json ./package.json

RUN yarn install --frozen-lockfile --prod --no-script && yarn cache clean

CMD ["yarn", "serve"]

