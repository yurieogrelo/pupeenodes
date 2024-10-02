# Usar uma imagem base do Node.js
FROM node:20.17.0

# Instalar dependências do Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Definir variáveis de ambiente
ARG PUPPETEER_SKIP_DOWNLOAD
ARG CHROME_BIN

ENV PUPPETEER_SKIP_DOWNLOAD=$PUPPETEER_SKIP_DOWNLOAD
ENV CHROME_BIN=$CHROME_BIN

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Comando para executar a aplicação
CMD ["node", "index.js"]
