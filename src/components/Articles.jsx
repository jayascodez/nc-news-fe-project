import { useEffect, useState } from "react"
import { getArticles}  from "../api"
import { useSearchParams} from "react-router"
import { SearchByTopic } from "./SearchByTopic"
import { ArticlesList } from "./ArticlesList"

export const Articles = ({loadingLottie}) => {
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    const topic = searchParams.get("topic") || ""
    const sort_by = searchParams.get("sort_by") || "created_at"
    const order_by = searchParams.get("order_by") || "DESC"

    useEffect(() => {
        setLoading(true);
        setIsError(null)

        getArticles(topic, sort_by, order_by).then((response) => {
            setArticles(response.articles)
            setLoading(false)
        })
        .catch((err)=> {
            setIsError("Failed to load articles: " + err.message)
            setLoading(false)
        })
    }, [searchParams])

    if(loading){
        return (<>
        <p>articles loading ...</p>
        {loadingLottie}
        </>)
    }

    const handleBackButton = () => {
        setSearchParams({})
        setIsError(null)
    }

    if (isError) {
        return (
            <>
                <p>{isError}</p>
                <p> Try searching another topic... </p>
                <button onClick={handleBackButton}> Back to articles </button>
            </>
        );
    }

    const handleSortByChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSearchParams({...Object.fromEntries(searchParams), [name]: value})
    }

    const handleOrderChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSearchParams({...Object.fromEntries(searchParams), [name]: value})
    }
       
    return (<>
        <h1>
        {topic.length === 0 ? "Looking at all articles" : `Looking at articles on ${topic}`}
        </h1>
        <SearchByTopic setSearchParams={setSearchParams}/>
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

        {topic && (<button onClick={handleBackButton}>Back to all articles</button>)}

        <ArticlesList articles={articles}/>
    </>)
}