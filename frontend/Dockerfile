# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /explorer

ADD package.json package-lock.json .npmrc ./
ADD generated-sources ./generated-sources
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /explorer

COPY --from=deps /explorer/node_modules /explorer/node_modules
ADD package.json package-lock.json .npmrc ./
ADD generated-sources ./generated-sources
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /explorer

COPY --from=deps /explorer/node_modules /explorer/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="3000"
ENV NODE_ENV="production"

WORKDIR /explorer

COPY --from=production-deps /explorer/node_modules /explorer/node_modules
COPY --from=production-deps /explorer/generated-sources /explorer/generated-sources

COPY --from=build /explorer/build /explorer/build
COPY --from=build /explorer/public /explorer/public
COPY --from=build /explorer/package.json /explorer/package.json
COPY --from=build /explorer/start.sh /explorer/start.sh

ENTRYPOINT [ "./start.sh" ]
