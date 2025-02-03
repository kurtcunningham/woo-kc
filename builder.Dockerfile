FROM node:20

ARG TARGET_DIR_NAME

RUN apt-get update
RUN apt-get install -y zip

ARG COPY_ROOT
COPY $COPY_ROOT /build/${TARGET_DIR_NAME}
WORKDIR /build/${TARGET_DIR_NAME}

RUN npm install
