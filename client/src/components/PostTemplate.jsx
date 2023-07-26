import React, {useState} from 'react';
import axios from "axios";
export default function PostTemplate(profileID) {
    
    const [postContent,setPostContent]=useState('');
    const [articleUrl,setArticleURL]=useState("");
    const [articleText,setArticleText]= useState("");
    const [articleTitle,setArticleTitle]=useState("");
      
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
          </>
          
        );
      
}