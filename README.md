# API Rest - Backoffice Dashboard Hotel Miranda

## Motivación

API que da soporte al [Dashboard](https://github.com/AgustinCarignano/dashboard-app) de gestion del Hotel Miranda.

Los recursos que se manejan son:

- Login de ususarios
- Reservas
- Habitaciones
- Usuarios
- Contactos

Las respuestas son todas en formato json. Puede explorar la [lista de endpoints](https://gztp5s40n9.execute-api.eu-west-3.amazonaws.com/latest/api/public) disponibles.

## Tecnologías utilizadas

Esta aplicación esta desarrollada utilizando Express.js y TypeScript. Implementa un sistema de autenticación de usuarios mediante Passport y jsonwebtoken, almacenando los datos en MongoDB.

Esta construida respetando una diseño por capas, separando modelos, controladores y routers, y desplegada en el servicio Lambda de AWS
