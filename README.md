# Proyecto desplegado en Netlify

https://samu3le-restaurant-test.netlify.app/

## Entorno de desarrollo

Ubuntu 20.04.03


Node v16.13.1

### docker --version

    Docker version 20.10.11, build dea9396

### docker-compose --version

    docker-compose version 1.27.4, build 40524192

## Comandos para ejecutar el contenedor:

    sudo docker-compose build --no-cache
    sudo docker-compose up -d --build samu3le_restaurant_frontend

## Para ver las imagenes creadas:

    sudo docker-compose ps

## Para ver los logs de la aplicación:

    sudo docker-compose logs -t -f samu3le_restaurant_frontend

## Nota:

Por defecto la URL del endpoint es "http://127.0.0.1:8080/api/", si desea especificar una solo debe agregar un archivo ".env" indicando la llave "VUE_ENDPOINT_URL". En la raiz del proyecto hay un archivo ".env.example" con la configuracion por defecto.

## Para instalarlo en local utilizar "nvm", el siguiente enlace es para instalarlo en el sistema:

    https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

## Si esta instalado ejecutar el siguiente comando:

    nvm install v16.13.1

    nvm use

    npm install
    
    npm run serve
