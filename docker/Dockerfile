# Stage 1: Build the application
FROM node:14 as builder
RUN mkdir -p /app
WORKDIR /app
COPY . /app
COPY node_modules /app
RUN yarn install

RUN yarn run build
RUN yarn run db:migrate
# # Stage 2: Run the application
FROM node:14

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .

EXPOSE 8080
CMD ["npm", "run", "start"]