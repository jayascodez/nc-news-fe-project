import { useState } from "react"
import { postComment } from "../api"

export const PostComment = ({article_id, onPost}) => {
    const [inputObject, setInputObject] = useState({
        "username": "tickle122",  //hardcoded as no functionality in the BE for authentication
        "body": ""
        })
    const [error, setError]= useState("")
    const [sucessful, setSucessful] = useState("")
    const [isSending, setIsSending] =useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputObject.body.trim().length === 0){
            setError("Comment cannot be empty")
            setSucessful("")
        }
        else {setError("")
            setIsSending(true)
            postComment(inputObject, article_id).then((response)=> {
                onPost(response.comment)})
            setIsSending(false)
            setSucessful("Comment posted")
            setInputObject({
                "username": "tickle122",
                "body": ""
            })
    }}

    const handleChange = (e) => {
        const copyInputObject = {...inputObject}
        copyInputObject[e.target.id] = e.target.value
        setInputObject(copyInputObject)
    }

    if(isSending){
        return <p> comment posting to article ...</p>
    }

    return (
    <>
        <form className="write-comment-form" onSubmit={handleSubmit}>
          <label className="form-input">
            New comment
            <input
              type="text"
              placeholder="Write your comment here..."
              onChange={handleChange}
              value={inputObject.body}
              id="body"
            />
          </label>
          {error && <div className="postcomment-error-msg">{error}</div>}
          {sucessful && <div className="success-post-msg">{sucessful}</div>}
          <button type="submit" id="submit-button">
            Submit
          </button>
        </form>
    </>
    );
};