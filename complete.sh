#!/bin/sh

echo "GID: $1"
echo "Number of files: $2"
echo "File Path: $3"
echo "Rclone Enabled: $RCLONE_ENABLED"
echo "Remote name: $RCLONE_REMOTE_NAME"
echo "Remote dir: $RCLONE_REMOTE_DIR"
echo "rclone copy $3 $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_DIR"

if [ "$RCLONE_ENABLED" = "true" ]
then
    rclone copy $3 $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_DIR
else
    echo "Done";
fi
