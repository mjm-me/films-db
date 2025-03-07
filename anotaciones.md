# ORM

## Prisma

Me sirve para interaccionar con la BD MySQL de manera más sencilla

npm i -D prisma

/proyecto/node_modules/.bin/prisma y npx lo busca siempre en esta carpeta de /node_modules

npx prisma --version

Prisma son 2 partes:

- CLI (no se instala directamente así que instalamos una herr. Es la 1ª instalación de dependencia: import { PrismaClient } from '@prisma/client';)
  El CLI es una herr. con comandos.

mpx prisma init --datasource-provider mysql (lo hacemos la primera vez y veremos que crea las carpetas <prisma> con su 'schema.prisma' y
el driver ya configurado y cambio lo que él me devuelve en el '.ENV' por el nbre de mi BD(movies, animals...):
DB_URL="mysql://root:curso@2025@localhost:3306/movies" )

- cliente

Lo instalo en package.json. No hay un prisma en el path porque hemos hecho una instalación local en nuestro proy. Node

Cuando voy creando la base de datos con nuevas tablas e incluso tablas intermedias, tengo que ir actualizando MySQL con:

npx prisma format (comprueba que hay tabla nueva pero no la crea en schema.prisma)

npx prisma migrate dev
(npx prisma generate --> si ha fallado la ejecución de Node)

el paquete npm se genera bajo demanda y se autogenera cuando hacemos un prisma

npx prisma db pull
npx prisma generate

## Cómo crear una BD desde Prisma (API)

Se trabajará con un api rest basada en Prisma

## Operaciones del CRUD

GET --> read  
POST --> create
PATCH --> update
DELETE --> delete

## JWT (JSON web tokens)

En el contexto de la autenticación basada en tokens, un JSON Web Token es una pieza esencial que permite de manera segura
y eficiente verificar la identidad de un usuario en aplicaciones web y servicios. Un JWT es un estándar abierto (RFC 7519)
que utiliza el formato JSON para representar información estructurada y firmada digitalmente.
Este token compacto consta de tres partes:

1.Encabezado (Header): El encabezado de un JWT contiene información sobre cómo se debe procesar el token y qué tipo de algoritmo de firma se está utilizando.
{
"alg": "HS256",
"typ": "JWT"
} 2. Carga útil (Payload): La carga útil contiene declaraciones e información adicional. La carga útil puede contener
información sobre alguna entidad, objeto o usuario, todo dependiendo de la logica de nuestra aplicación.

{
"id": "1234567890",
"name": "John Doe",
"admin": true
}

3. Firma (Signature): La firma toma la codificación Base64Url del encabezado y la carga útil, y luego las firma
   utilizando un secreto (con HMAC) o una clave privada (con algoritmos de firma como RSA).
   Ejemplo (con HMAC SHA256):

## Payload

Se utiliza para transmitir información estructurada entre un servidor y un cliente y su sintaxis es fácilmente
interpretable tanto por humanos como por máquinas. El término payload en este contexto hace referencia a la carga
útil de datos que se envía en una solicitud o respuesta HTTP.

Los datos de carga útil en NodeJs son solo paquetes o fragmentos de datos enviados al servidor y a los que no se puede
acceder de manera normal . Se puede acceder a ellos cuando los decodificamos, utilizando el módulo string_decoder y
algunos de sus métodos como on y end. En un marco de NodeJS conocido como Express. js, un ejemplo es el
módulo body-parser.

### Payload Request

En el contexto de las API, el payload se refiere a los datos que se envían en el cuerpo de una solicitud HTTP o en
la respuesta HTTP. El payload se refiere a los datos que se envían en una solicitud o respuesta, generalmente en
formato JSON o XML como ya se los he mostrado, también pueden ser archivos binarios.

Es lo que yo pongo en la <app.ts>

declare module 'express' {
interface Request {
user?: Payload;
}
}
