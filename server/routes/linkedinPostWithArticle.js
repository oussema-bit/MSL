const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios=require('axios');



router.post('/',async function (req,res){
  const session= req.sessionStore.sessions;
  const firstPropertyName = Object.keys(session)[0];
  const obj = JSON.parse(session[firstPropertyName]);
  const accessToken= obj.accessToken;
  console.log(accessToken)
  const { content, profId,articleURL,articleText,articleTitle } = req.body;
  try {
    // Make a POST request to the LinkedIn API to create a new share (post)
    const response = await axios.post(
      `https://api.linkedin.com/v2/ugcPosts`,
      {
        author: `urn:li:person:${profId}`, // The LinkedIn profile ID
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "ARTICLE",
            media: [
                {
                    status: "READY",
                    description: {
                        text: "articleText"
                    },
                    originalUrl: "https://www.infoworld.com/article/2683784/what-is-cloud-computing.html",
                    title: {
                        text: "articleTitle"
                    }
                }
            ]
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS', // Change visibility if needed
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // LinkedIn API returns a successful response with the post details
    console.log('LinkedIn post response:', response.data);
    res.json({ success: true, message: 'Post created successfully on LinkedIn!' });
  } catch (error) {
    console.error('Error creating LinkedIn post:', error.message);
    // Handle the error response
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error creating LinkedIn post.',
    });
  }
      
});


module.exports=router;