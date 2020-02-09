# A Pokitto IDE + Simulator

Develop in python from your browser for Pokitto, simulate/run you python
programs on a virtual Pokitto in your browser.

## Development Environment

This repository contains several symbol links.
Due to, it is recommended to use a linux based operating system.

## Install Node

Steps are documented [here](https://github.com/nodesource/distributions/blob/master/README.md) 

```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Running Locally

Make sure you have npm installed, apt install npm might help.

```sh
$ git clone https://github.com/genko/PyInSky.git
$ cd PyInSky
$ ./install_gcc-arm-none-eabi.sh
$ ./generate_project_examples.sh
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).
