FROM node:18.0 as build

# install dependencies
COPY package.json yarn.lock ./
COPY vite.config.js ./
# Copy all local files into the image.
COPY . ./
RUN yarn
RUN npm run build
###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM node:17.0-slim

WORKDIR /app
COPY --from=build . ./

EXPOSE 3000
CMD ["node", "./build"]