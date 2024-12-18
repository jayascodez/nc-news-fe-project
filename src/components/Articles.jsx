import { useEffect, useState } from "react"
import { getArticles, getArticleById} from "../api"
import { Link, useParams} from "react-router"
import { Comments } from "./Comments"
import { VoteOnArticle } from "./VoteOnArticle"

export const Articles = ({loading, setLoading, articles, setArticles={setArticles}}) => {
    const [singleArticle, setSingleArticle] = useState([])
    const {article_id} = useParams()

    useEffect(() => {
        setLoading(true)
        if(article_id){
            getArticleById(article_id).then((response)=> {
            setSingleArticle(response.article)
            setLoading(false)
        })}
        else{
        getArticles().then((response) => {
            setArticles(response.articles)
            setSingleArticle([])
            setLoading(false)
        })}
    }, [article_id])

    if(loading){
        return <p>articles loading ...</p>
    }

    if(singleArticle.length != 0){
        const convertedTime = new Date(singleArticle.created_at).toLocaleString()
        return (<>
            <h2>{singleArticle.title}</h2>
            <h3>Article topic: {singleArticle.topic}</h3>
            <h4>Written by {singleArticle.author} on {convertedTime}</h4>
            <img src={singleArticle.article_img_url} alt={singleArticle.title} className="article-img"></img>
            <h4>{singleArticle.body}</h4>
            <div id="voting">
                <VoteOnArticle votes={singleArticle.votes} article_id={singleArticle.article_id}/>
            </div>
            <div id="comments-box">
                <Comments/>
            </div>
        </>)
    }

    return (<>
        <h2>All articles</h2>

        <Link to='/search'>
            <input
            type="text"
            placeholder="search by topic..."/>
            <button type="submit" >Search</button>
        </Link>

        <ul className="articles-list">
            {articles.map((article) => {
                const convertedTime = new Date(article.created_at).toLocaleString()
                return (
                    <li key={article.article_id} className="article-ind">
                        <Link to={`/articles/${article.article_id}`}>
                            <h3 id="article-list-titles">{article.title}</h3>
                            <h4>Written by {article.author} on {convertedTime}</h4>
                            <img src={article.article_img_url} alt={article.title} className="article-img"></img>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </>)
}