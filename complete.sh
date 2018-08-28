#!/bin/sh

if [ $RCLONE_ENABLED == "true" ]; then
    rclone copy $3 $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_DIR
else
    echo "Done";
fi
