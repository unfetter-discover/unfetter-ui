FROM node:8.5.0-alpine

# Create Application Directory
ENV WORKING_DIRECTORY /usr/share/unfetter-ui
RUN mkdir -p $WORKING_DIRECTORY
WORKDIR $WORKING_DIRECTORY

# Install Dependencies
COPY package-lock.json $WORKING_DIRECTORY
COPY package.json $WORKING_DIRECTORY

# RUN rm -rf $WORKING_DIRECTORY/node_modules

RUN echo $WORKING_DIRECTORY

RUN apk update && \
    # angular uses node-sass, this will allow us to get the correct prebuilt arch
    apk add --no-cache libsass && \
    # get correct webpack version, match this with package-lock.json
    # npm install -g webpack@~2.3.1 webpack-dev-server@2.4.1 && \
    # get correct webpack-merge to fix, Error: Cannot find module 'webpack-merge' 
    # npm install webpack-merge@3.0.0 -D && \
    npm install && \
    # The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
    find / -name "cb-never*.tgz" -delete

COPY . $WORKING_DIRECTORY

RUN npm run build:prod && \
    # The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
    find / -name "cb-never*.tgz" -delete && \
    rm -rf /usr/share/man && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*

# Start Application
EXPOSE 80
CMD [ "npm", "run", "server:dev:alt"]
