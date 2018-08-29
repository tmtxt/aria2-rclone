# Aria2 with WebUI & RClone Image

This Docker image contains `aria2` downloader CLI app, the
[web-ui](https://github.com/ziahamza/webui-aria2) and [rclone](https://rclone.org/). The idea is to
create a simple Docker image that I can install on my own VPS for downloading files that take long
time to finish or to trigger downloading files using my mobile phone. The files will then be
transferred to a Cloud storage that I can access on my phone (Google Drive for example).

# Ports

- 8080: aria2 webui port
- 6800: aria2 rpc port

# Volumes

- `/data`: used to store downloaded files
- `/root/.config/rclone`: rclone config dir, mention later

# Environment variables

- `PASSWORD`: aria2 rpc password
- `RCLONE_ENABLED`: true/false - default to false
- `RCLONE_REMOTE_NAME`: rclone remote name
- `RCLONE_REMOTE_DIR`: rclone remote directory to upload the downloaded files to

# Usage

## Aria2 only

```
$ docker run \
    -e "PASSWORD=my-password" \
    -v /path/to/data:/data \
    -p 8080:8080 \
    -p 6800:6800 \
    tmtxt/aria2-rclone:1.1.1
```

You can then access to `localhost:8080` to open the Aria2 WebUI. You will also need to input the rpc
password in `Settings > Connection Settings > Enter the secret token`. After that, you can enjoy it
as a normal downloader

## With rclone

If you want use `rclone` to upload the file after complete, you need to generate the config file for
rclone first. `rclone` is installed in the image already. You can start a new container, mount the
volume you want to store config file and use `rclone` to generate config file. For example

```
$ docker run --rm -it \
    -v /path/to/rclone/config:/root/.config/rclone \
    tmtxt/aria2-rclone:1.1.1 \
    bash
$ rclone config
```

After that, just follow the guides to finish the configuration step. You can find more detailed
guide for each cloud provider [here](https://rclone.org/docs/). After you finish all the steps, the
configuration files will be stored in the mounted volume.

Next, run the container with the rclone flag turned on

```
$ docker run \
    -e "PASSWORD=my-password" \
    -e "RCLONE_ENABLED=true" \
    -e "RCLONE_REMOTE_NAME=gdrive" \
    -e "RCLONE_REMOTE_DIR=Aria2-Download" \
    -v /path/to/data:/data \
    -v /path/to/rclone/config:/root/.config/rclone \
    -p 8080:8080 \
    -p 6800:6800 \
    tmtxt/aria2-rclone:1.1.1
```

The downloaded files will be sent directly to the configured remote after downloaded.

## Use your own complete script

The current image use the `complete.js` script. You can override it to use your own script by
mounting another folder to `/usr/src/app/scripts`. That folder should container an executable file
named `complete.js`. Check
[aria2 event hook documentation](https://aria2.github.io/manual/en/html/aria2c.html#event-hook)
about the arguments passed to the script.

## Use it on your VPS

Simple run the container with the 2 published ports like above. After that, open the web ui, head to
`Settings > Connection Settings`, update the host and the port to match your server ip/domain and
port.
