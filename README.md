## Description

[Simple ToDo App with NestJS](https://github.com/onetech-project/todo-nestjs)

## Stack
- NestJS
- MongoDB
- Docker

## Installation

```bash
$ npm install
```

## ENV FILE

create a ```.env``` file with this content below:

```
MONGODB_URI=<MONGO URL>
NODE_ENV=development|production
JWT_SECRET=<JWT SECRET>
JWT_EXPIRY=<JWT EXPIRY TIME IN SECOND e.g: 900s>
PORT=<APP PORT>
THROTTLE_TTL=<RATE LIMITTER TTL>
THROTTLE_LIMIT=<RATE LIMITTER LIMIT IN MILLISECOND>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

then open the [App](localhost:3000) or the [Swagger](localhost:3000/api) on your browser.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build

```bash
$ docker build --rm --no-cache -t todo-nest-image .
$ docker run -e MONGODB_URI=mongodb://<host>:<port>/todo-nest --name todo-app -p 3000:3000 -d todo-nest-image
```

## Stay in touch

- Author - [Faris Baros](https://onetech-project.github.io)
- LinkedIn - [Faris Baros](https://www.linkedin.com/in/faris-baros-680b4613a/)

## License

Nest is [MIT licensed](LICENSE).
