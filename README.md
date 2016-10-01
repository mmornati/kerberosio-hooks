[![Build Status](https://travis-ci.org/mmornati/kerberosio-hooks.svg?branch=master)](https://travis-ci.org/mmornati/kerberosio-hooks)[![Code Climate](https://codeclimate.com/github/mmornati/kerberosio-hooks/badges/gpa.svg)](https://codeclimate.com/github/mmornati/kerberosio-hooks)[![Issue Count](https://codeclimate.com/github/mmornati/kerberosio-hooks/badges/issue_count.svg)](https://codeclimate.com/github/mmornati/kerberosio-hooks)

# kerberosio-hooks
Kerberos.io WebHooks and Listener to push messages on Pushbullet

With this script you can start a TCP listener or a WebHook to use with Kerberos.io monitoring System.

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
To activate the Pushbullet functionality you need to configure into the pushballet plugin, the service API key (you can create one in your pushbullet account page).
Edit the **plugins/pushbullet/config.js** file one and change the following line:

```javascript
define('KEY', 'test');
```

replacing ''your-key'' with the Pushbullet key.

You can then configure some other parameters used by the plugin:
```javascript
define('IMAGES_BASE_URL', 'https://media.home.mornati.net/');
define('IMAGES_BASE_PATH', '/mnt/kerberosio/machinery/capture/');
define('IMAGE_METHOD', 'PATH');
```

* IMAGES_BASE_URL: used as base image path to upload the image to pushbullet (the url should be accessible from internet).
* IMAGES_BASE_PATH: local path where Kerberos.io images are stored.
* IMAGE_METHOD: which method you want to use to upload the image to pushbullet (PATH/URL). The default is the local PATH.

```javascript
define('DEVICE_ID', undefined);
```
If you want to notify only one device, you can configure the Pushbullet device id here.

## TCP Listener Usage
To start the TCP Lisner you can simply use the following command:

```bash
node listener.js
```

A server will be started on **1337** port and you can configure it into your kerberos.io server configuration.
For any motion detection a simple message will be sent to your pushbullet.

## WebHook Usage
To start the WebHook Listener you can use the following command line:

```bash
node webhook.js
```

A webserver will be started on port **8080**. You can configure the hook into the Kerberos.io configuration.
The url for the hook is *http://serverip:8080/kerberosio*
The sent message will contain some information about the detection (image url, time, ...).

## Init.d Service
You can start your service in background and configure to start it up automatically with the system startup.

First of all you need to install *forever*

```bash
npm install -g forever
```

Then you can simply use (and configure) the sample init.d script you can find into the source folder (*webhook-init-d*).

```bash
sudo cp webhook-init-d /etc/init.d/webhook
sudo /etc/init.d/webhook start
```
