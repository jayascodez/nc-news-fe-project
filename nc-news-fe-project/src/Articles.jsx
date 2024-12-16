import { useEffect, useState } from "react"
import { getArticles} from "./api"
import { Link} from "react-router"

export const Articles = () => {
    
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then((response) => {
            setArticles(response.articles)
        })
    }, [])


    return (<>
        <h2>All articles</h2>
        <button>Sort by topic</button>
        <ul className="articles-list">
            {articles.map((article) => {
                return <Link to= {`/api/articles/${article.article_id}`} ><li key ={article.article_id} className="article-ind">
                    <h3>{article.title}</h3>
                    <h4>Written by {article.author} on {article.created_at}</h4>
                    <img src={article.article_img_url} alt="article-image" className="article-img"></img>
                    <button> 
                        {/* onclick take to comments section of single article? */}
                        Comments </button>
                </li></Link>
            })}
        </ul>
    </>)
}