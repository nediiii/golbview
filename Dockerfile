FROM nediiii/golbview-builder AS builder

COPY . .

RUN yarn build

# docker build . -t nediiii/golbview

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
