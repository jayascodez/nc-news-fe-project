import { useState, useEffect} from "react"
import { updateArticleVotes } from "../api"

export const VoteOnArticle = ({votes, article_id}) => {
    const [articleVotes, setArticleVotes]= useState(votes)
    const [userVoted, setUserVoted] = useState(false)
    const [articleLikes, setArticleLikes] = useState(votes)
    const [articleDislikes, setArticleDislikes] = useState(votes)


    const percentageArticleVotes = () => {
        const totalVotes = articleDislikes+articleLikes
        return (totalVotes === 0 ? "no votes yet" : (Math.floor((articleLikes/totalVotes)*100))+"% liked this")
    }

    const handleLikes = (inc_votes) => {
        setArticleLikes((currCount) => currCount + inc_votes)
        updateArticleVotes(article_id, inc_votes)
        .then((response) => {
            setArticleLikes(response.article.votes)
            setUserVoted(true)
        })
    }

    const handleDislikes = (dec_votes) => {
        setArticleDislikes((currCount) => {currCount + dec_votes})
        updateArticleVotes(article_id, dec_votes)
        .then((response) => {
            setArticleDislikes(response.article.votes)
            setUserVoted(true)
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
    <button onClick={()=>handleLikes(1)}>Like</button>
    <button onClick={()=> handleDislikes(-1)}>Dislike</button>   
    </>)


}