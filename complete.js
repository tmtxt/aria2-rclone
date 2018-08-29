#!/usr/bin/env node

const childProcess = require('child_process');
const path = require('path');

const rcloneEnabled = process.env.RCLONE_ENABLED === 'true';
const rcloneRemoteName = process.env.RCLONE_REMOTE_NAME;
const rcloneRemoteDir = process.env.RCLONE_REMOTE_DIR;
const dataDir = process.env.DATA_DIR;

const gid = process.argv[2];
const fileCount = parseInt(process.argv[3]) || 0;
const filePath = process.argv[4];

if (!rcloneEnabled) {
  console.log('Rclone not enabled');
  process.exit(1);
}

if (!filePath) {
  console.log('No file path');
  process.exit(1);
}

if (fileCount < 1) {
  console.log('No files');
  process.exit(1);
}

// only 1 file, copy that file directly to remote
if (fileCount === 1) {
  const command = `rclone copy "${filePath}" "${rcloneRemoteName}:${rcloneRemoteDir}"`;
  console.log('command:', command);
  childProcess.exec(command, {}, (err, stdout, stderr) => {
    if (err) {
      console.log('err:', err);
      console.log('stderr:', stderr);
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  // multiple file, create directory on remote first

  // get dir name first
  let filePathNoDataDir = filePath.substring(dataDir.length);
  if (filePathNoDataDir[0] === path.sep) {
    filePathNoDataDir = filePathNoDataDir.substring(1);
  }
  const dirName = filePathNoDataDir.split(path.sep)[0];
  const dirPath = path.join(dataDir, dirName);

  const mkdirCommand = `rclone mkdir "${rcloneRemoteName}:${rcloneRemoteDir}/${dirName}"`;
  console.log('mkdirCommand:', mkdirCommand);
  childProcess.exec(mkdirCommand, {}, (err, stdout, stderr) => {
    if (err) {
      console.log('err:', err);
      console.log('stderr:', stderr);
      process.exit(1);
    }

    const copyCommand = `rclone copy "${dirPath}/" "${rcloneRemoteName}:${rcloneRemoteDir}/${dirName}/"`;
    console.log('copyCommand', copyCommand);
    childProcess.exec(copyCommand, {}, (err, stdout, stderr) => {
      if (err) {
        console.log('err:', err);
        console.log('stderr:', stderr);
        process.exit(1);
      }

      process.exit(0);
    });
  });
}
