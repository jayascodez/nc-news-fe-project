import { useEffect, useState} from "react"
import { getComments } from "../api"
import {useParams} from 'react-router'

export const Comments = () => {
    const [loadingComments, setLoadingComments] = useState(true)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(false)
    const {article_id} = useParams()

    useEffect(() => {
        setLoadingComments(true)
        getComments(article_id).then((response) => {
            setComments(response.comments)
            setLoadingComments(false)
        })
    },[article_id])
    
    if(loadingComments){
        return <p>comments loading ...</p>
    }

    const handleShowMore = () => {
        setShowMore(true)
    }

    const commentsShown = showMore ? comments : comments.slice(0,2)

    return (<>
    <h4>All Comments</h4>
        {commentsShown.map((comment) => {
           return <ol key={comment.comment_id} className="comments-list">
                <li><h5>{comment.author} on {comment.created_at}</h5>
                <p>{comment.body}</p></li>
            </ol>
        })}
        {comments.length > 3 && !showMore && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        <button>Write a comment </button>
    </>)
}