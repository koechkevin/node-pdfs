# Stage 1: Build the application
FROM node:19 as builder
RUN mkdir -p /app
WORKDIR /app
COPY . /app
COPY node_modules /app
RUN yarn install

RUN yarn run build
# RUN yarn run db:migrate
# # Stage 2: Run the application
FROM node:19

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .

EXPOSE 9358
CMD ["npm", "run", "start"]