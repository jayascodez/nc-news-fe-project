import { useEffect, useState } from "react"
import { getArticles}  from "../api"
import { Link, useParams, useSearchParams} from "react-router"
import { SearchByTopic } from "./SearchByTopic"

export const Articles = ({loadingLottie}) => {
    const [articles, setArticles] = useState([])
    const [sortByQuery, setSortByQuery] = useState("created_at")
    const [orderQuery, setOrderQuery] = useState("DESC")
    const [isError, setIsError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const {article_id} = useParams()
    const {topicQuery} = useParams()

    useEffect(() => {
        setLoading(true);
        getArticles(topicQuery, sortByQuery, orderQuery).then((response) => {
            setArticles(response.articles)
            setLoading(false)
        })
        .catch((err)=> {
            setIsError("Failed to load articles")
        })
    }, [article_id, topicQuery, sortByQuery, orderQuery])

    if(loading){
        return (<>
        <p>articles loading ...</p>
        {loadingLottie}
        </>)
    }

    const handleSortByChange = (e) => {
        const value = e.target.value
        setSortByQuery(value)
        setSearchParams({...Object.fromEntries(searchParams), sortByQuery: value})
    }

    const handleOrderChange = (e) => {
        const value = e.target.value
        setOrderQuery(value)
        setSearchParams({...Object.fromEntries(searchParams), orderQuery: value})
    }


    return (<>
        <h1>All articles</h1>
        <p><SearchByTopic/> </p>
        <select
        id="sortBy-dropdown"
        onChange={handleSortByChange}
        name="sort_by"
        value={sortByQuery}>
            <option disabled>Sort By</option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
        </select>

        <select
        id="order-dropdown"
        onChange={handleOrderChange}
        name="order_by"
        value={orderQuery}>
            <option disabled>Order</option>
            <option value="DESC"> Desc</option>
            <option value="ASC"> Asc</option>
        </select>

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