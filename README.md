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
To activate the Pushbullet fonctionality you need to configure inside the scripts your pushballet key (you can create one in your pushbullet account page).
Edit the **listener.js** file and/or the **webhook.js** one and change the following line:

```javascript
var pusher = new PushBullet('your-key');
```

replacing ''your-key'' with the Pushbullet key.

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
