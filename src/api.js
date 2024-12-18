import axios from "axios"

const baseApi = axios.create({
    baseURL: "https://nc-news-be-project-1ajv.onrender.com/api"
})

export const getArticles = () => {
        return  baseApi.get(`/articles`).then((response) => {
            return response.data
        })
}

export const getArticleById = (article_id) => {
    return baseApi.get(`/articles/${article_id}`).then((response) => {
        return response.data
    })
}

export const getComments = (article_id) => {
    return baseApi.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data
    })
}

export const updateArticleVotes = (article_id, inc_votes) => {
    return baseApi.patch(`/articles/${article_id}`, {inc_votes}).then((response) => {
        return response.data
    })
}

export const getTopics = () => {
    return baseApi.get('/topics').then((response)=> {
        return response.data
    })
}

export const postComment = (inputObject, article_id) => {
    return baseApi.post(`/articles/${article_id}/comments`, inputObject).then((response)=> {
        console.log(response.data)
        return response.data
    })
}