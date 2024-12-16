import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Header } from './Header'
import { Articles } from './Articles'
import { AboutUs } from './AboutUs'
import { SingleArticle } from './SingleArticle'


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/api/articles/:article_id" element = {<SingleArticle/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
