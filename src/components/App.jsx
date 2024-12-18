import '../api'
import '../App.css'
import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Header } from './Header'
import { Home } from './Home'
import { Articles } from './Articles'
import { AboutUs } from './AboutUs'
import { Comments } from './Comments'
import { SeachByTopic } from './SearchByTopic'


function App() {

  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/articles" element={<Articles loading={loading} setLoading={setLoading} articles = {articles} setArticles={setArticles}/>}/>
        <Route path="/articles/:article_id" element = {<Articles loading={loading} setLoading={setLoading} articles = {articles} setArticles={setArticles}/>}> Back to Articles</Route> 
        <Route path='/articles/:article_id"/comments' element={<Comments/>}/>
        <Route path='/search' element={<SeachByTopic articles={articles} />}/>
        <Route path='/search/:topic' element={<SeachByTopic articles={articles} />}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
