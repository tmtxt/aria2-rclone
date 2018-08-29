web:    sh -c 'cd ./webui-aria2 && http-server -p 8080'
aria2:  sh -c 'touch /data/session.txt && aria2c --enable-rpc --rpc-listen-all --disable-ipv6 --save-session=/data/session.txt --input-file=/data/session.txt -x16 -s16 -k1M --dir=/data --rpc-secret=$PASSWORD --on-download-complete="/usr/src/app/scripts/complete.js" --on-bt-download-complete="/usr/src/app/scripts/complete.js"'
