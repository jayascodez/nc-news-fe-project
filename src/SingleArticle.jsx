import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getArticleById } from "./api"

export const SingleArticle = () => {
    
    const [singleArticle, setSingleArticle] = useState([])
    const {article_id} = useParams()

    useEffect(()=> {
        getArticleById(article_id).then((response)=> {
            setSingleArticle(response.article)
        }) 
    },[article_id])

    return (<>
        <h2>{singleArticle.title}</h2>
        <h3>Article topic: {singleArticle.topic}</h3>
        <h4>Written by {singleArticle.author} on {singleArticle.created_at}</h4>
        <img src={singleArticle.article_img_url} alt="article-image" className="article-img"></img>
        <h4>{singleArticle.body}</h4>

        <div id="comments-box">
            <h4>Comments</h4>
        </div>
    </>)
}
