configuraciones:
En el archivo .env se encuentran las variables de entorno para el funcionamiento de la aplicacion.

Back: (back/.env)
FRONT_ENDPOINT= variable para especificar los origines separados por [,] ejemplo (FRONT_ENDPOINT=http://localhost:8080,http://localhost:3000)

FRONT_CHAT= variable de entorno para el front ejemplo:( http://localhost:8080)
BACK_PORT= variable de entorno para especificar el puerto para el back ejemplo: (3000)
BACK_ENDPOINT= variable de entorno para espeficar el endpoint del back ejemplo: (http://localhost:3000/api)

SRC=variable de entorno para la raiz por defecto es ("./")

DB_HOST= variable de entorno para instancia de la nase de datos ejemplo:(localhost)
DB_USER= variable de entorno para el usuario de la base de datos (root)
DB_PASSWORD= variable de entorno para la contraseña de la base de datos ejemplo (1234567)
DB_DATABASE= variable de entorno para la base de datos por defecto es (chat)

front: (front/.env)
NODE_PATH= variable de entorno para raiz del proyecto (src)
VUE_APP_BACK_END_POINT= variable de entorno para el endpoint del back (http://localhost:3000)

La base de datos se encuentra en MySQL se adjunta en script database.sql para relizar la migración.

### ejecutar la aplicacion de front end
1) cd front
2) yarn install
3) yarn serve

### ejecutar la aplicacion de back end
1) cd back
2) yarn install
3) yarn start:dev
4) ruta del api


### Compiles and hot-reloads for development
```
yarn serve

La sala de chat
Hey Center le pide que cree una sala de chat con mensajes de chat entrantes y salientes.
Requerimientos:

● Cada pestaña funcionará como una sala de chat, el usuario debe proporcionar un nombre de usuario y luego puede comenzar a chatear con los otros usuarios conectados (use socket.io o GraphQL suscripciones).

● La lista de mensajes debe mostrarlos en el orden correcto con el formato marca de tiempo en que se envió el mensaje y su respectivo autor.
● Enviar solo texto (con validación simple).
● Mostrar un estilo diferente para los mensajes entrantes y salientes (posición, color, etc.).
● Mantenga el historial de chat en una base de datos (se recomienda MongoDB).
● Extraiga y muestre mensajes antiguos mediante una API (REST o GraphQL).

Opcional:
● Enviar / recibir imágenes o archivos en el chat.
● Agregue un método para buscar en el historial de chat.

Qué necesitamos de ti:
● Constrúyalo con VueJS / Vuex
● Use NodeJS como backend
● Utilice un preprocesador CSS (se recomienda SASS)
● Siéntase libre de usar cualquier tema visual que le guste y con el que se sienta cómodo (Bootstrap,

Diseño de materiales, cimentación, etc.)
● Utilice las herramientas / bibliotecas que necesite (paquete web, gulp, etc.)
● Comparta un repositorio con nosotros (github o bitbucket están bien)
● El repositorio debe proporcionar instrucciones sobre cómo ejecutarlo (README.md).