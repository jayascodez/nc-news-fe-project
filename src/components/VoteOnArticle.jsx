import { useState, useEffect} from "react"
import { updateArticleVotes } from "../api"

export const VoteOnArticle = ({votes, article_id}) => {
    const [articleVotes, setArticleVotes]= useState(votes)
    const [userVoted, setUserVoted] = useState(false)
    const [articleLikes, setArticleLikes] = useState(votes)
    const [articleDislikes, setArticleDislikes] = useState(votes)
    const [error, setError] = useState(null)

    const percentageArticleVotes = () => {
        const totalVotes = articleDislikes+articleLikes
        return (totalVotes === 0 ? "no votes yet" : (Math.floor((articleLikes/totalVotes)*100))+"% liked this")
    }

    const handleVotes = (inc_votes) => {
        setArticleLikes((currCount) => currCount + inc_votes)
        updateArticleVotes(article_id, inc_votes)
        .then((response) => {
            setArticleVotes(response.article.votes)
            if(inc_votes === 1){
                setArticleLikes(response.article.votes)
            }
            if(inc_votes === -1){
                setArticleDislikes(response.article.votes)
            }
            setUserVoted(true)
        })
        .catch((err) => {
            setUserVoted(false)
            setError("offline -cannot vote")
        })
    }

    if(userVoted){
        return <>
        <p>{percentageArticleVotes()}</p>
        <p>Thanks for your vote!</p>
        </>
    }

    return(<>  
    <p>Enjoying this article?</p>
    <p> {percentageArticleVotes()}</p>
    <p>Votes: {articleVotes}</p>
    <button onClick={()=>handleVotes(1)}>Like</button>
    <button onClick={()=> handleVotes(-1)}>Dislike</button>   
    {error && <p>{error}</p>}
    </>)


}