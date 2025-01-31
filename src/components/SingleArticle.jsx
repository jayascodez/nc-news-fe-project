import { useEffect, useState } from "react"
import { Comments } from "./Comments"
import { VoteOnArticle } from "./VoteOnArticle"
import { useNavigate, useParams} from "react-router"
import { getArticleById} from "../api"


export const SingleArticle = ({loadingLottie}) => {
    const [singleArticle, setSingleArticle] = useState([])
    const [loading, setLoading] = useState(true)

    const {article_id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
            getArticleById(article_id).then((response)=> {
            setSingleArticle(response.article)
            setLoading(false)
        })
    }, [article_id])

    if(loading){
        return (<>
        <p>article loading ...</p>
        {loadingLottie}
        </>)}

    const handleBackButton = () => {
        setSingleArticle([])
        navigate("/articles")
    }

    if(singleArticle.length != 0){
        const convertedTime = new Date(singleArticle.created_at).toLocaleString()
        return (<>
        <button onClick={handleBackButton}>Back to all articles</button>
        <div className="single-article-card">
            <h2>{singleArticle.title}</h2>
            <h3>Article topic: {singleArticle.topic}</h3>
            <h4>Written by {singleArticle.author} on {convertedTime}</h4>
            <img src={singleArticle.article_img_url} alt={singleArticle.title} className="article-img"></img>
            <h4>{singleArticle.body}</h4>
        </div>
            <div id="voting">
                <VoteOnArticle votes={singleArticle.votes} article_id={singleArticle.article_id}/>
            </div>
            <div id="comments-box">
                <Comments/>
            </div>
        </>)
    }
}