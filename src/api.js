import axios from "axios"

const baseApi = axios.create({
    baseURL: "https://nc-news-be-project-1ajv.onrender.com/api"
})

export const getArticles = () => {
        return  baseApi.get("/articles").then((response) => {
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

export const getTopics = (topic_query) => {
    return baseApi.get('/topics').then((response)=> {
        return response.data
    })
}

export const postComment = (inputObject, article_id) => {
    return baseApi.post(`/articles/${article_id}/comments`, inputObject).then((response)=> {
        return response.data
    })
}

export const deleteComment = (comment_id) => {
    return baseApi.delete(`/comments/${comment_id}`).then((response)=>{
        return response.data
    })
}

export const getUsers = () => {
    return baseApi.get("/users").then((response) => {
        return response.data
    })
}