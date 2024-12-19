import '../api'
import '../App.css'
import { Routes, Route } from 'react-router'
import { Header } from './Header'
import { Home } from './Home'
import { Articles } from './Articles'
import { AboutUs } from './AboutUs'
import { SeachByTopic } from './SearchByTopic'
import { Profile } from './Profile'
import { SingleArticle } from './SingleArticle'

function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/:article_id" element = {<SingleArticle/>}> Back to Articles</Route> 
        <Route path='/search' element={<SeachByTopic/>}/>
        <Route path='/search/:topic' element={<SeachByTopic />}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
