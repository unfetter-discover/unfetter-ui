FROM jmfirth/webpack

# Install packages
RUN npm install -g angular-cli && apt-get update && apt-get install git -y;

# Create Application Directory
ENV WORKING_DIRECTORY /usr/share/unfetter-ui
RUN mkdir -p $WORKING_DIRECTORY
WORKDIR $WORKING_DIRECTORY

# Install Dependencies
COPY package.json $WORKING_DIRECTORY

# The NPM package depends on TAR package, which has a test directory with an encrypted tgz file, that gets blocked by some antivirus scanners. Removing it.
RUN npm install; find / -name "cb-never*.tgz" -delete; npm cache clean
COPY . $WORKING_DIRECTORY
RUN find / -name "cb-never*.tgz" -delete; npm cache clean

# Start Application
EXPOSE 80
CMD [ "npm", "run", "server:dev"]
