# Usa uma imagem oficial do Node.js. A versão 18 é uma escolha segura e moderna.
FROM node:18-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o resto do código do seu backend para o contêiner
COPY . .

# Expõe a porta que sua aplicação usa (você usa a porta do Render, que é 10000, mas vamos usar a padrão 8080)
# O Fly.io vai mapear o tráfego da internet para esta porta automaticamente.
EXPOSE 8080

# O comando para iniciar sua aplicação quando o contêiner rodar
CMD ["npm", "start"]