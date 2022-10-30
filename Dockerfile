FROM node:16.12.0-alpine
RUN npm install -g npm@8.5.4
# Add a work directory
WORKDIR /app
# Cache and Install dependencies

COPY editor/ ./editor/

COPY package.json .
COPY package-lock.json .
RUN npm install --force
RUN npm install node-sass@6.0.1

RUN npm add file:./editor
# Copy app files

COPY . .
# Expose port
EXPOSE 8080
# Start the app
CMD [ "yarn", "start" ]
