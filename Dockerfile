FROM node:8.4.0-alpine

# Create Application Directory
# ENV SASS_BINARY_NAME /usr/share/unfetter-ui/node_modules/node-sass
ENV WORKING_DIRECTORY /usr/share/unfetter-ui
# ENV PATH $WORKING_DIRECTORY/node_modules/.bin:$PATH
RUN mkdir -p $WORKING_DIRECTORY
WORKDIR $WORKING_DIRECTORY

# Install Dependencies
COPY package.json $WORKING_DIRECTORY

RUN apk update && \
    # build node-sass; 
    # TODO: clean this up, there is a prebuilt for alpine linux with musl
    # apk add --no-cache python && \
    # python -m ensurepip && \
    # pip install --upgrade pip setuptools && \
    # apk add --no-cache make && \
    # apk add --no-cache g++ && \
    # npm rebuild node-sass --force && \
    # angular uses node-sass
    apk add --no-cache libsass && \
    npm install -g webpack@~2.3.1 webpack-dev-server@2.4.1 && \
    # get latest webpack-merge to fix, Error: Cannot find module 'webpack-merge' 
    npm install webpack-merge -D && \
    # npm install webpack webpack-dev-server -g && \
    npm install

COPY . $WORKING_DIRECTORY

RUN npm run build:prod && \
    # The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
    find / -name "cb-never*.tgz" -delete && \
    rm -rf /usr/share/man && \
    rm -rf /tmp/*  && \
    rm -rf /var/cache/apk/*
    # rm -rf /usr/lib/node_modules/npm/man && \
    # rm -rf /usr/lib/node_modules/npm/doc && \
    # rm -rf /usr/lib/node_modules/npm/html
    # rm -r /usr/lib/python*/ensurepip && \
    # rm -r /root/.cache

# Start Application
EXPOSE 80
CMD [ "npm", "run", "server:dev:alt"]
