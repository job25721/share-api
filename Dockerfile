FROM node:14.15.1
WORKDIR /app
COPY "package.json" .
COPY "yarn.lock" .
RUN yarn 
COPY . .
RUN yarn build
CMD ["yarn","start:prod"]