FROM node:8.5-alpine

LABEL MAINTAINER="UNFETTER"
LABEL Description="UNFETTER user interface, Angular app"

# Create Application Directory
ENV WORKING_DIRECTORY /usr/share/unfetter-ui
RUN mkdir -p $WORKING_DIRECTORY
WORKDIR $WORKING_DIRECTORY

# Install Dependencies
# COPY package-lock.json $WORKING_DIRECTORY
COPY package.json $WORKING_DIRECTORY

# RUN rm -rf $WORKING_DIRECTORY/node_modules
RUN echo $WORKING_DIRECTORY

# The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
RUN npm --loglevel error install && \
    find / -name "cb-never*.tgz" -delete

COPY . $WORKING_DIRECTORY

# The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
RUN npm --loglevel error run build:prod && \
    find / -name "cb-never*.tgz" -delete && \
    rm -rf /usr/share/man && \
    rm -rf /tmp/*

# Start Application
EXPOSE 80
CMD [ "npm --loglevel error", "run", "server:dev:alt"]

