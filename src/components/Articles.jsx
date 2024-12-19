import { useEffect, useState } from "react"
import { getArticles}  from "../api"
import { Link, useParams} from "react-router"
import {SortByButton} from "./SortByButton"

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const {article_id} = useParams()

    useEffect(() => {
        setLoading(true)
        getArticles().then((response) => {
            setArticles(response.articles)
            setLoading(false)
        })
    }, [article_id])

    if(loading){
        return <p>articles loading ...</p>
    }

    return (<>
        <h2>All articles</h2>

        <Link to='/search'>
            <input
            type="text"
            placeholder="search by topic..."/>
            <button type="submit" >Search</button>
        </Link>

        <SortByButton articles={articles}/>

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