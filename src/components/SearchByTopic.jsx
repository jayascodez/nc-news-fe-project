import { useEffect, useState } from "react"
import { getTopics } from "../api"
import { Link, useParams} from "react-router"

export const SeachByTopic = () => {
    const [searchInput, setSearchInput] = useState("")
    const [topics, setTopics] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])
    const [error, setError] = useState("")

    const {topic} = useParams()
    // const {topic_query} = query

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        // const byTopic = articles.filter((article)=> article.topic === searchInput)
        if(byTopic.length === 0){
            setError(`No articles about ${searchInput} found`)
        }
        setFilteredArticles(byTopic)
    }

    useEffect(()=> {
        getTopics(topic_query).then((response)=>{
            setTopics(response.topics)
        })
        .catch((err)=> {
            setError("Failed to load topics")
        })
    },[])

    useEffect(()=> {
        setError("")
        if(topic){
            const byTopic = articles.filter((article)=> article.topic === searchInput)
            {if(byTopic.length === 0){
                setError(`No articles about ${searchInput} found`)
            }}
            setFilteredArticles(byTopic)
        }
    },[topic])

    return (<>
        <input
        type="text"
        placeholder="search by topic..."
        onChange={handleChange}
        value={searchInput}/>
        <button type="submit" id="search-button" onClick={handleSubmit}>Search</button>

        <p>Search result:</p>
        {error!=="" ? 
         (<><p>Error: {error} </p> 
        <p>Try searching some trending topics...</p>
        {topics.map((topic)=> {
           return  <ul key={topic.slug} className="trending-topics">
                    <li>{topic.slug} </li>
            </ul>
        })}
        </>)
        :  
        <ul>
            {filteredArticles.map((article) => {
            const convertedTime = new Date(article.created_at).toLocaleString()
                return <li key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                    <h3>{article.title}</h3>
                    <h4>Written by {article.author} on {convertedTime}</h4>
                    <img src={article.article_img_url} alt={article.title} className="article-img"></img>
                    </Link>
                </li>
            })}
        </ul>
}
    </>)
}