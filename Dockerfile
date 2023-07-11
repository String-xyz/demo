FROM node:18.0 as build

COPY . ./

# install dependencies
RUN yarn

RUN yarn run build

FROM node:17.0-slim

#TODO copy only the necessary files
WORKDIR /app
COPY --from=build . ./

EXPOSE 3000
CMD ["node", "./build"]
