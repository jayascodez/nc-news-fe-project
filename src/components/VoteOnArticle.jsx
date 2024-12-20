import { useState} from "react"
import { updateArticleVotes } from "../api"

//some work on percentage functionality needed
//article votes currently can be reduced by a dislike, need it to count total amount of likes and dislikes

export const VoteOnArticle = ({votes, article_id}) => {
    const [articleVotes, setArticleVotes]= useState(votes)
    const [userVoted, setUserVoted] = useState(false)
    const [articleLikes, setArticleLikes] = useState(0)
    const [error, setError] = useState(null)

    const percentageArticleVotes = () => {
        const totalVotes = articleVotes
        return (totalVotes === 0 ? "no votes yet" : (Math.floor((articleLikes/totalVotes)*100))+"% of voters liked this")
    }

    const handleVotes = (inc_votes) => {
        if(inc_votes === 1) {setArticleLikes( articleLikes + 1)}

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
        <h3>{percentageArticleVotes()}</h3>
        <p>Overall Votes: {articleVotes}</p>
        <h3>Thanks for your vote!</h3>
        </>
    }

    return(<>  
    <h3>Enjoying this article?</h3>
    <h3> {percentageArticleVotes()}</h3>
    <p>Overall votes: {articleVotes}</p>
    <button className="like-button" onClick={()=>handleVotes(1)}>Like</button>
    <button className="like-button" onClick={()=> handleVotes(-1)}>Dislike</button>   
    {error && <p>{error}</p>}
    </>)


}