import { useState } from "react"
import { deleteComment } from "../api"


export const DeleteComment = ({comment, onDelete}) => {
    const [deletedMsg, setDeletedMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleClick = () => {
        setIsLoading(true)
        setError("")
        deleteComment(comment.comment_id).then(()=> {
            setDeletedMsg("Comment Deleted!")
            setIsLoading(false)
            onDelete(comment.comment_id)
        }).catch((err)=> {
            setIsLoading(false)
            setError("Error deleting comment, try again later")

        })
    }

    return (
        <>
            {deletedMsg.trim().length === 0 && comment.author === "tickle122" && (
                <>
                    <button onClick={handleClick} id="delete-comment-button" disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete comment"}
                    </button>
                    <p>{deletedMsg}</p>
                </>
            )}
            {deletedMsg.trim().length > 0 && <p>{deletedMsg}</p>}
            {error && <p>{error}</p>}
        </>
    )
}