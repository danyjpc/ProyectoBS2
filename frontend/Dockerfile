FROM node:alpine AS builder
COPY . ./frontend
WORKDIR /frontend
#ENV SERVER=52.160.67.118
RUN npm i
RUN $(npm bin)/ng build --prod --build-optimizer=false --aot=false

FROM nginx:alpine
COPY --from=builder /frontend/dist/frontend/ /usr/share/nginx/html/