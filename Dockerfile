FROM node:17.0-slim

WORKDIR /app
COPY ./.svelte-kit/ /.svelte-kit
COPY ./build /build

EXPOSE 3000
CMD ["node", "./build"]