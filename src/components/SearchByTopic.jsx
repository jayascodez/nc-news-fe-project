
export const SearchByTopic = ({setSearchParams, topic, setTopic}) => {

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