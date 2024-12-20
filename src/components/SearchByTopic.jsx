import { useEffect, useState } from "react"
import { getArticles, getTopics } from "../api"
import { Link, useParams, useSearchParams} from "react-router"

export const SearchByTopic = () => {

    const {topicQuery} = useParams()

    return (<>
        <input
        placeholder="search by topic"
        />
        <button type="submit"> Search</button>
   </>)
}