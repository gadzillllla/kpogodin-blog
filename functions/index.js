// ...
// Import functions and GCS
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;

exports.onFileChange = functions.storage.object().onChange(event => {
  // ...
  // Extract object data - left out to focus on the other parts of the function

  if (object.resourceState === 'not_exists') {
    console.log('We deleted a file, exit...');
    return;
  }

  if (path.basename(filePath).startsWith('resized-')) {
    console.log('We already renamed that file!');
    return;
  }

  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return destBucket
    .file(filePath)
    .download({
      destination: tmpFilePath,
    })
    .then(() => {
      return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
    })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: 'resized-' + path.basename(filePath),
        metadata: metadata,
      });
    });
});
