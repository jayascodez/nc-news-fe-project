
export const SearchByTopic = ({setSearchParams}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const topic = e.target.topic.value.trim()
        setSearchParams({topic})
    }

    return (<>
         <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="topic"
                    placeholder="search by topic"
                />
                <button type="submit" >Search</button>
            </form>
    </>)
}