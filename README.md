salud-web
===========
Web app for YesDoc

Build & development
-------------------

###Instalamos NodeJS

    curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
    sudo apt-get install --yes nodejs

###Instalamos las dependencias

    # Instalamos el administrador de paquetes
    sudo apt-get install npm
    sudo npm install -g npm
    # Dependiendo de la version de NodeJS puedes necesitar
    sudo ln -s /usr/bin/nodejs /usr/bin/node

    # Dependencias de NodeJS
    cd web/
    sudo npm install
    sudo npm install -g yo bower grunt-cli

    # Dependencias de YesDoc
    cd web/
    bower install

###Iniciamos el servidor

    # Para preparación
    grunt

    # Para iniciar el servidor
    grunt serve


## Testing

Running `grunt test` will run the unit tests with karma.
