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

RUN apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

EXPOSE 9358
CMD ["npm", "run", "start"]