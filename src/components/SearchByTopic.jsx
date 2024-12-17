import { useEffect } from "react"
import { useState } from "react"
import { getTopics } from "../api"

export const SeachByTopic = () => {
    const [searchInput, setSearchInput] = useState("")
    const [topics, setTopics] = useState([])

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleSubmit = () => {

    }

    useEffect(()=> {
        getTopics().then((response)=>{
            setTopics(response.topics)
        })
    },[])

    // add props of all articles
    // filter all articles to articles with topic of search submit
    // add pics of trending topics 

    return (<>
        <input
        type="text"
        placeholder="search by topic..."
        onChange={handleChange}
        value={searchInput}/>
        <button type="submit" onSubmit={handleSubmit}>Search</button>
    
        <p>Trending topics...</p>
        {topics.map((topic)=> {
           return  <ul key={topic.slug} className="trending-topics">
                <li>
                    <p>{topic.slug}</p>
                </li>
            </ul>
        })}
    </>)
}