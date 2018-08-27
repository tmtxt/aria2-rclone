FROM node:8.11.4

# common
RUN apt-get update
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# web ui
RUN git clone https://github.com/ziahamza/webui-aria2.git
RUN npm install -g http-server
EXPOSE 8080

# aria2 process
EXPOSE 6800

# Procfile management
RUN npm install -g foreman
ADD Procfile /usr/src/app/Procfile

CMD ["nf", "start"]
