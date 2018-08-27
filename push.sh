#!/bin/sh

if [[ -n "$1" ]]; then
    docker push tmtxt/aria2-rclone:$1
else
    echo "Usage: push.sh version"
    echo "Ex: push.sh 1.0.0"
fi
