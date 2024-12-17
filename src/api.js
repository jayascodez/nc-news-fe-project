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