# Arquitectura de Capas

# Comandos para ejecutar 

node index.js --puerto 8080 --modo FORK
node index.js --puerto 8080 --modo CLUSTER

nodemon index.js --puerto 8080 --modo FORK
nodemon index.js --puerto 8080 --modo CLUSTER

forever index.js --puerto 8080 --modo FORK
forever index.js --puerto 8080 --modo CLUSTER

pm2 start index.js --name="server" --watch 
pm2 start index.js --name="server" --watch -i max