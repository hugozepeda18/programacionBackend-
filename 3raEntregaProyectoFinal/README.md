# 3raEntregaProyectoFinal

# Before running
In .env change pwd for your MongoDB Password

# Run commands 
node ./src/index.js --puerto 8080 --modo FORK
node ./src/index.js --puerto 8080 --modo CLUSTER

# For Random number generation (XXX = Numbers to generate)
localhost:8080/api/randoms?count=XXX

# For Info
localhost:8080/info