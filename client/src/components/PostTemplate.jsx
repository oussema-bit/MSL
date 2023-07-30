import React, {useRef, useState} from 'react';
import axios from "axios";
export default function PostTemplate(profileID) {
    
    const [postContent,setPostContent]=useState(null);
    const [articleUrl,setArticleURL]=useState(null);
    const [articleText,setArticleText]= useState(null);
    const [articleTitle,setArticleTitle]=useState(null);
    const [postImage,setPostImage]=useState(null);
    const image_Ref=useRef(null);
    const [fileIm,setfileIm]=useState(null);
      const handleSubmit= async (e)=>{
        e.preventDefault();
        const res=  await axios.post('/post/linkedin/',{
          content: postContent, 
          profId: profileID.profileID
        });
        console.log(res);
      }

      const handleSubmitWithArticle= async (e)=>{
        e.preventDefault();
        try {
          await axios.post('/post/linkedin/article',{
            content: postContent,
            profId: profileID.profileID,
            articleURL: articleUrl,
            article_text : articleText,
            article_title : articleTitle,
          });
        } catch (error) {
          console.log(error);
        }
      }

      const handleSubmitWithImage= async (e)=>{
        e.preventDefault();
        /*const formData=new FormData();
        formData.append('postimage',fileIm);
        formData.append('content',postContent);

        formData.append('profId',profileID.profileID);*/
        const res=  await axios.post('/post/linkedin/image',{
          content: postContent, 
          profId: profileID.profileID,
          postimage: postImage
        });
        console.log(res);
      }
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(e);
        setfileIm(file);
        const imageURL= URL.createObjectURL(file);
        setPostImage(imageURL);
        
      };
    
      
    
        return (
          <>
          <form onSubmit={handleSubmit}>
            
            <textarea
              name="content"
              type="text"
              value={postContent}
              onChange={(event)=>{
                setPostContent(event.target.value);
              }}
            ></textarea>
            <button type="submit" >
              Post
            </button>
            
          </form>

          <form onSubmit={handleSubmitWithArticle}>
            <label>Post text content:</label>
            <textarea
              name="content"
              type="text"
              value={postContent}
              onChange={(event)=>{
                setPostContent(event.target.value);
              }}
            ></textarea>
            <label>Article URL:</label>
            <textarea
              name="articleURL"
              value={articleUrl}
              type="text"
              onChange={(event)=>{
                setArticleURL(event.target.value);
              }}
            ></textarea>
            <label>Article title :</label>
            <textarea
              name="article_title"
              value={articleTitle}
              type="text"
              onChange={(event)=>{
                setArticleTitle(event.target.value);
              }}
            ></textarea>
            <label>Article text :</label>
            <textarea
              name="article_text"
              value={articleText}
              type="text"
              onChange={(event)=>{
                setArticleText(event.target.value);
              }}
            ></textarea>
            <button type="submit" >
              Post with article
            </button>
            
          </form>
              <br/>

          <form onSubmit={handleSubmitWithImage}>
            
            <textarea
              name="content"
              type="text"
              value={postContent}
              onChange={(event)=>{
                setPostContent(event.target.value);
              }}
            ></textarea>
            <input 
            type="file"
            accept='image/*'
            onChange={handleImageChange}
            ref={image_Ref}
            />
            <button type="submit">
              Post
            </button>
            <div>
              <img src={postImage} alt="" srcset="" />
            </div>
          </form>
          </>
          
        );
      
}