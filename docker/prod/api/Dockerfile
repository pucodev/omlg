FROM node:22.18-alpine3.22

# Install dependencies
RUN npm install -g oh-my-logo
RUN apk add --no-cache go=1.24.7-r0
RUN go install github.com/wader/ansisvg@master
RUN cp $(go env GOPATH)/bin/ansisvg /usr/local/bin

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

CMD npm run start
