FROM nediiii/golbview-builder

COPY . .

RUN yarn build

# docker build . -t nediiii/golbview
