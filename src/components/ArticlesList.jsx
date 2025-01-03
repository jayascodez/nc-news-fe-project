import { Link } from "react-router"

export const ArticlesList = ({articles}) => {
    return (<> 
    <ul className="articles-list">
        {articles.map((article) => {
            const convertedTime = new Date(article.created_at).toLocaleString()
            return (
                <li key={article.article_id} className="article-ind">
                    <div className="article-card">
                    <Link to={`/articles/${article.article_id}`}>
                        <h3 id="article-list-titles">{article.title}</h3>
                        <h4>Written by {article.author} on {convertedTime}</h4>
                        <img src={article.article_img_url} alt={article.title} className="article-img"></img>
                    </Link>
                    </div>
                </li>
            )
        })}
    </ul>
</>)
}