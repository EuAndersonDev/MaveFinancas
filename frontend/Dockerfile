# Use a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./
COPY . .

# Instala as dependências
RUN npm install

# Compila o projeto
RUN npm run build

# Expõe a porta do Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]