FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Bundle source
COPY . /usr/src/app

ENV NODE_ENV=production

RUN npm run build

CMD [ "npm", "run", "build"]

RUN echo -e "BEFORE\n" && ls && find . -mmin +1 -delete && echo -e "\nAFTER\n" && ls

FROM nginx

COPY /dist /usr/share/nginx/html

EXPOSE 80





