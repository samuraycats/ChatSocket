
# Hey! Chat

### Configuraciones:
En el archivo .env se encuentran las variables de entorno para el funcionamiento de la aplicación.

#### Back: (back/.env)
FRONT_ENDPOINT= variable para especificar los origines separados por [,] ejemplo (FRONT_ENDPOINT=http://localhost:8080,http://localhost:3000)

FRONT_CHAT= variable de entorno para el front ejemplo:( http://localhost:8080)
BACK_PORT= variable de entorno para especificar el puerto para el back ejemplo: (3000)
BACK_ENDPOINT= variable de entorno para especificar el endpoint del back ejemplo: (http://localhost:3000/api)

SRC=variable de entorno para la raíz por defecto es ("./")

DB_HOST= variable de entorno para instancia de la base de datos ejemplo:(localhost)
DB_USER= variable de entorno para el usuario de la base de datos (root)
DB_PASSWORD= variable de entorno para la contraseña de la base de datos ejemplo (1234567)
DB_DATABASE= variable de entorno para la base de datos por defecto es (chat)

#### Front: (front/.env)
NODE_PATH= variable de entorno para raíz del proyecto (src)
VUE_APP_BACK_END_POINT= variable de entorno para el endpoint del back (http://localhost:3000)

La base de datos se encuentra en MySQL se adjunta en script database.sql para realizar la migración.

### Ejecutar la aplicación de front end
```sh
$ cd front
$ yarn install
$ yarn serve
```

### Ejecutar la aplicación de back end
```sh
$ cd back
$ yarn install
$ yarn start:dev
```

### Ruta de Api back
```
http://localhost:3000/api-docs/
```
