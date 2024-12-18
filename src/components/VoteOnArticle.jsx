import { useState, useEffect} from "react"
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
        return (totalVotes === 0 ? "no votes yet" : (Math.floor((articleLikes/totalVotes)*100))+"% liked this")
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
        <p>{percentageArticleVotes()}</p>
        <p>Overall Votes: {articleVotes}</p>
        <p>Thanks for your vote!</p>
        </>
    }

    return(<>  
    <p>Enjoying this article?</p>
    <p> {percentageArticleVotes()}</p>
    <p>Overall votes: {articleVotes}</p>
    <button onClick={()=>handleVotes(1)}>Like</button>
    <button onClick={()=> handleVotes(-1)}>Dislike</button>   
    {error && <p>{error}</p>}
    </>)


}