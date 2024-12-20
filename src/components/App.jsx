import '../api'
import '../App.css'
import { Routes, Route } from 'react-router'
import { Header } from './Header'
import { Home } from './Home'
import { Articles } from './Articles'
import { SearchByTopic } from './SearchByTopic'
import { Profile } from './Profile'
import { SingleArticle } from './SingleArticle'
import Lottie from "react-lottie"
import animationData from "../lotties/LoadingAnimation.json"


function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
}
  const loadingLottie = <Lottie 
          options={defaultOptions}
          height={150}
          width={300}
          />

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/articles" element={<Articles loadingLottie={loadingLottie}/>}/>
        <Route path="/articles/:article_id" element = {<SingleArticle loadingLottie={loadingLottie}/>}> Back to Articles</Route> 
        <Route path='/search' element={<SearchByTopic/>}/>
        <Route path='/search/:topic' element={<SearchByTopic />}/>
        <Route path="/profile" element={<Profile loadingLottie={loadingLottie}/>}/>
      </Routes>
    </>
  )
}

export default App
