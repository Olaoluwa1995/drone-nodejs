const fs = require('fs');
const path = require('path');

exports.uploadImage = async (fileToUpload) => {
  try {
    // Generate upload key and get file type
    const { name } = fileToUpload;
    const splitFileName = name.split('.');
    const ext = splitFileName[splitFileName.length - 1];

    fileToUpload.mv(path.join('./uploads', `${Date.now()}.${ext}`), (err) => {
      if (err) {
        return false;
      }
    });
    const url = `/${Date.now()}.${ext}`;
    return url;
  } catch (err) {
    console.log(err);
  }
};