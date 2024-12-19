import { useEffect, useState} from "react"
import { getComments } from "../api"
import { useParams, useNavigate} from 'react-router'
import { PostComment } from "./PostComment"
import { DeleteComment } from "./DeleteComment"

export const Comments = () => {
    const [loadingComments, setLoadingComments] = useState(true)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(false)

    const {article_id} = useParams()
    const navigate = useNavigate()

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
        setShowMore(!showMore)
    }

    const commentsShown = showMore ? comments : comments.slice(0,2)

    const handlePost = () => {
       navigate(`/articles/${article_id}`) 
    };

    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment.comment_id !== commentId))
    }

    return (<>
     <div className="post-comment">
        <PostComment article_id={article_id} onPost={handlePost}/>
    </div>
    <h4>All Comments</h4>
        {commentsShown.map((comment) => {
            const convertedTime = new Date(comment.created_at).toLocaleString()
           return <ol key={comment.comment_id} className="comments-list">
                <li><h5>{comment.author} on {convertedTime}</h5>
                <p>{comment.body}</p></li>
                
            <DeleteComment comment={comment} onDelete={handleDelete}/>
            </ol>
        })}
        {comments.length > 2 && (
                <button onClick={handleShowMore}>{showMore? "Show Less" : "Show More" }</button>
            )}

    </>)
}