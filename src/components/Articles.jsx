import { useEffect, useState } from "react"
import { getArticles}  from "../api"
import { Link, useSearchParams} from "react-router"
import { SearchByTopic } from "./SearchByTopic"

export const Articles = ({loadingLottie}) => {
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    const [sort_by, setSort_by] = useState("created_at")
    const [order_by, setOrder_by] = useState("DESC")


    useEffect(() => {
        setLoading(true);
        const topic = searchParams.get("topic")

        getArticles(topic, sort_by, order_by).then((response) => {
            setArticles(response.articles)
            setLoading(false)
        })
        .catch((err)=> {
            setIsError("Failed to load articles")
        })
    }, [searchParams, sort_by, order_by])

    if(loading){
        return (<>
        <p>articles loading ...</p>
        {loadingLottie}
        </>)
    }

    const handleSortByChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSort_by(value)
        setSearchParams({...Object.fromEntries(searchParams), [name]: value})
        console.log(sort_by)
    }

    const handleOrderChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setOrder_by(value)
        setSearchParams({...Object.fromEntries(searchParams), [name]: value})
        console.log(order_by)
    }

    return (<>
        <h1>All articles</h1>
        <p><SearchByTopic setSearchParams={setSearchParams}/> </p>
        <select
        id="sortBy-dropdown"
        onChange={handleSortByChange}
        name="sort_by"
        value={sort_by}>
            <option disabled>Sort By</option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count NOT WORKING</option>
            <option value="votes">Votes</option>
        </select>

        <select
        id="order-dropdown"
        onChange={handleOrderChange}
        name="order_by"
        value={order_by}>
            <option disabled>Order</option>
            <option value="DESC"> Desc</option>
            <option value="ASC"> Asc</option>
        </select>

        <ul className="articles-list">
            <p>You are reading "all / THIS TOPICS ARTICLES articles"</p>

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