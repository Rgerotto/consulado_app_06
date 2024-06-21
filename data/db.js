//Conexión a la base de datos
const mysql = require('mysql');

//Datos de la base de datos registrados en archivo .env
const connection = mysql.createConnection({
    host: "localhost",
    port: "3309",
    user: "rafaelcoelho",
    // password: "123456", // Uncomment and add your password
    database: "consulado"
});

//Establecer conexión a la base de datos
connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado a la base de datos");
});

//Exportar la conexión a la base de datos para que pueda ser utilizada en otros ficheros
module.exports = connection;