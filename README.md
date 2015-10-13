salud-web
===========
Web app for YesDoc

Build & development
-------------------

###Instalar NodeJS

    curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
    sudo apt-get install --yes nodejs

###Instalar las dependencias

    # Instalar el administrador de paquetes
    sudo apt-get install npm
    sudo npm install -g npm

    # Dependencias de NodeJS
    cd web/
    sudo npm install
    sudo npm install -g yo bower grunt-cli

    # Dependencias de YesDoc
    cd web/
    bower install

###Iniciar el servidor

    # Para iniciar el servidor
    grunt serve


## Testing

Running `grunt test` will run the unit tests with karma.
