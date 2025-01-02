import { useState} from "react"
import { updateArticleVotes } from "../api"

export const VoteOnArticle = ({votes, article_id}) => {
    const [articleVotes, setArticleVotes]= useState(votes)
    const [userVoted, setUserVoted] = useState(false)
    const [error, setError] = useState(null)

    const handleVotes = (inc_votes) => {
        updateArticleVotes(article_id, inc_votes)
        .then((response) => {
            setArticleVotes(response.article.votes)
            setUserVoted(true)
        })
        .catch((err) => {
            setError("Vote not counted - check your network connection")
            setUserVoted(false)
        })
    }

    if(userVoted){
        return <>
        <p> Overall votes: {articleVotes}</p>
        <h3>Thanks for your vote!</h3>
        </>
    }

    return(<>  
    <h3>Enjoying this article?</h3>
    <p>Overall votes: {articleVotes}</p>
    <button className="like-button" onClick={()=>handleVotes(1)}>Like</button>
    <button className="like-button" onClick={()=> handleVotes(-1)}>Dislike</button>   
    {error && <p>{error}</p>}
    </>)
}