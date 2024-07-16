FROM node:20.5.1-alpine
WORKDIR /account

COPY . .
COPY .env.example .env

RUN npm cache clean --force
RUN npm install -g @nestjs/cli bcrypt ts-node rimraf

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]
