FROM ubuntu:20.04

RUN  apt-get update \
     && apt-get install -y curl \
     && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
     && apt-get install -y nodejs

WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN  apt-get install -y wget gnupg ca-certificates procps libxss1 \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update

ENV TZ=Europe/Madrid 
RUN echo "Preparing geographic area ..."
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN  apt-get install -y google-chrome-stable \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

COPY ./fonts/ /usr/share/fonts/truetype

RUN fc-cache -f -v
RUN rm -rf /var/lib/apt/lists/*

COPY ./swagger.json ./
COPY ./app.js ./

EXPOSE 3000

CMD ["node", "app.js"]