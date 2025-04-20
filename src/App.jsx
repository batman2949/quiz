import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Quiz } from './quiz'
import { CheckAnswer } from './checkanswer'
import { Savedquestions } from './savedquestions'
import { QuizWithoutTimer } from './quizwithouttimer'
import { Savedquestionsdilogbox } from './saveddialog'
import { AnimatedBackground } from 'animated-backgrounds';
import { ToastContainer, toast } from 'react-toastify';
const  router = createBrowserRouter([
  {
    path:"/",
    element:<div>
      <AnimatedBackground 
  animationName="starryNight" 
  blendMode="Color-Dodge" 
/>
    <Quiz/>
    </div>
    
  },
  {
    path:"/quizanswercheck",
    element:
    <div>
      <AnimatedBackground 
  animationName="starryNight" 
  blendMode="Color-Dodge" 
/>
    <CheckAnswer/>
    </div>
  },
  {
    path:"/saveddata",
    element:
    <div>
      <AnimatedBackground 
  animationName="starryNight" 
  blendMode="Color-Dodge" 
/>
      <Savedquestions/>
    </div>
  },
  {
    path:"/quizwithouttimer",
    element:
    <div>
      <AnimatedBackground 
  animationName="starryNight" 
  blendMode="Color-Dodge" 
/>
      <QuizWithoutTimer/>
    </div>
  },
  {
    path:"/Savedquestionsdilogbox",
    element:
    <div>
      <AnimatedBackground 
  animationName="starryNight" 
  blendMode="Color-Dodge" 
/>
    <Savedquestionsdilogbox/>
    </div>
  }
])

function App() {
  return (
    <div>
      <ToastContainer/>
     <RouterProvider router = {router}/> 
    </div>
  )
}

export default App
