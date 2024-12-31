import { useState } from "react"

export const SearchByTopic = ({setSearchParams}) => {
    const [topic, setTopic] = useState("")

    const handleSubmit = () => {
        setSearchParams({topic})
    }

    const handleChange = (e) => {
        setTopic(e.target.value)
    }

    return (<>
        <input
        type="text"
        placeholder="search by topic"
        value={topic}
        onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}> Search</button>
   </>)
}