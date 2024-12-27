# Usar la imagen oficial de Node.js como base
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalar las dependencias definidas en package.json
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer el puerto en el que la aplicación estará corriendo
EXPOSE 8080

# Ejecutar la aplicación
CMD [ "npm", "start" ]
