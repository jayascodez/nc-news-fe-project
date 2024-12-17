import '../api'
import '../App.css'
import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Header } from './Header'
import { Home } from './Home'
import { Articles } from './Articles'
import { AboutUs } from './AboutUs'
import { Comments } from './Comments'


function App() {

  const [loading, setLoading] = useState(true)

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/articles" element={<Articles loading={loading} setLoading={setLoading}/>}/>
        <Route path="/api/articles/:article_id" element = {<Articles loading={loading} setLoading={setLoading}/>}> Back to Articles</Route> 
        <Route path='/api/articles/:article_id"/comments' element={<Comments/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
