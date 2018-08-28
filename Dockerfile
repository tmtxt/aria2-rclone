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
RUN apt-get install -y aria2
EXPOSE 6800

# Procfile management
RUN npm install -g foreman
ADD Procfile /usr/src/app/Procfile

# directory for the script when download complete
RUN mkdir -p /usr/src/app/scripts
ADD complete.sh /usr/src/app/scripts/
RUN chmod +x /usr/src/app/scripts/complete.sh

# directory for storing downloaded files and session
VOLUME ["/data"]

# default to disable rclone
ENV RCLONE_ENABLED="false"

CMD ["nf", "start"]
