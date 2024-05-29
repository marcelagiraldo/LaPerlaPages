# Stage: build
FROM node:20 as build-stage
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build
###########################################
# Stage: production
FROM httpd:latest as production-stage
COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf
WORKDIR /app
COPY --from=build-stage /build/dist/ .
RUN rm -rf build

