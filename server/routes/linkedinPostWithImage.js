const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios=require('axios');
const multer= require('multer');
const fileStream= require('fs');
const upload=multer({dest: '../uploads'})


router.post('/',upload.single('postimage'),async function (req,res){
  const session= req.sessionStore.sessions;
  const firstPropertyName = Object.keys(session)[0];
  const obj = JSON.parse(session[firstPropertyName]);
  const accessToken= obj.accessToken;
  console.log(accessToken)
  const { content, profId,postimage } = req.body;
  console.log(req.file);
  try {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
  
      const data = {
        "registerUploadRequest": {
            "recipes": [
                "urn:li:digitalmediaRecipe:feedshare-image"
            ],
            "owner": `urn:li:person:${profId}`,
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }
            ]
        }
      };
  
      const response = await axios.post('https://api.linkedin.com/v2/assets?action=registerUpload', data, { headers });
      console.log('Initialize upload successful.');
      const uploadUrl=response.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
      console.log(req.body);
      console.log(postimage);
      //uploadMedia(postimage,accessToken,uploadUrl,fileStream);
  } catch (error) {
    console.error('Error creating LinkedIn post:', error.message);
    // Handle the error response
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error creating LinkedIn post.',
    });
  }
      
});

async function uploadMedia(filepath,accessToken,uploadUrl,fs) {
  try {

    // Create a read stream of the media file
    const fileStream = fs.createReadStream(filepath);

    // Determine the content type based on the file extension
    const contentType = 'image/png'; // Change to 'image/jpeg', 'video/mp4', etc., as needed

    // Set headers for the PUT request
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': contentType,
      'Content-Length': fs.statSync(filepath).size,
    };

    // Make the PUT request to upload the media data
    const response = await axios.put(uploadUrl, fileStream, { headers });

    console.log('Media upload successful.');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Media upload failed:', error.response ? error.response.data : error.message);
  }
}


module.exports=router;