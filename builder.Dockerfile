FROM nediiii/node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npm.taobao.org/ && yarn install && yarn config set registry https://registry.npmjs.org/

# docker build . -f builder.Dockerfile -t nediiii/golbview-builder
