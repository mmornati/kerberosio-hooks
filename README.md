[![Build Status](https://travis-ci.org/mmornati/kerberosio-hooks.svg?branch=master)](https://travis-ci.org/mmornati/kerberosio-hooks) [![Code Climate](https://codeclimate.com/github/mmornati/kerberosio-hooks/badges/gpa.svg)](https://codeclimate.com/github/mmornati/kerberosio-hooks) [![Test Coverage](https://codeclimate.com/github/mmornati/kerberosio-hooks/badges/coverage.svg)](https://codeclimate.com/github/mmornati/kerberosio-hooks/coverage) [![Issue Count](https://codeclimate.com/github/mmornati/kerberosio-hooks/badges/issue_count.svg)](https://codeclimate.com/github/mmornati/kerberosio-hooks)

# kerberosio-hooks
Kerberos.io WebHooks extensible module to be notified where you need if anything happens on you Kerberosio

## Installation
Clone the project on your system:

```bash
git clone https://github.com/mmornati/kerberosio-hooks
```

Install all dependencies using npm:

```bash
cd kerberosio-hooks
npm install
```

## Configuration
To use this module you need to configure into the **config/default.json** file containing basic parameters and all the module's too.

```json
{
  "server_port": 8080,
  "activated_plugins": ["pushbullet"],

}
```

* server_port: configure the listen port for the WebHook server_port
* activated_plugins: list of plugins you want to use (contained into the **plugins** folder)

### Pushbullet Configuration

```json
{
  "pushbullet_key": "test",
  "device_id": "",
  "images_base_url": "https://media.home.mornati.net/'",
  "images_base_path": "/mnt/kerberosio/machinery/capture/",
  "image_method": "PATH"
}
```

* pushbullet_key: is the API key you can obtain on the Pushbullet website
* images_base_url: used as base image path to upload the image to Pushbullet (the url should be accessible from internet).
* images_base_path: local path where Kerberos.io images are stored.
* image_method: which method you want to use to upload the image to pushbullet (PATH/URL). The default is the local PATH.
* device_id: If you want to notify only one device, you can configure the Pushbullet device id here.


## WebHook Usage
To start the WebHook Listener you can use the following command line:

```bash
node index.js
```

A webserver will be started on the configure port (by default **8080**).
Into the Kerberos.io configuration you can then configure the URL of the server: **http://ip:port/kerberosio**
The sent message will contain some information about the detection (image url, time, ...).

## Init.d Service
You can start your service in background and configure to start it up automatically when the system starts up.

First of all you need to install *forever*

```bash
npm install -g forever
```

Then you can simply use (and configure) the sample init.d script placed in the root source folder (*webhook-init-d*).

```bash
sudo cp webhook-init-d /etc/init.d/webhook
sudo /etc/init.d/webhook start
```

