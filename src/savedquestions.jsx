import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { CrossMark } from "./cross";
import { ArrowNextLtr } from "./next";
import { ArrowNextRtl } from "./previous";
import { EyeHideFill16 } from "./hide";
import { ViewShow } from "./show";
import { motion } from "motion/react"


const Savedquestions=()=>{
    const[saveddata,setSaveddata] = useState([]);
    const[status, setStatus] = useState(false);
    let[arrayIndex, setArrayIndex] = useState(0);
    const[answerStatus, setAnswerStatus] = useState(true);
    // const blackdiv = useRef();
    const navigate = useNavigate();
    async function savedata(){
    let datasaved = await localStorage.getItem("array");
    if(datasaved){
        const parseddata = await JSON.parse(datasaved);
        setSaveddata(parseddata);
    }
    }
    useEffect(()=>{
        savedata();
    },[])
      
    const previousone=()=>{
        if(arrayIndex>0 && arrayIndex<saveddata.length){
            const index = arrayIndex-1;
            setArrayIndex(index);
            return;
        }
    }

    const nextone=()=>{
        if(arrayIndex>=0 && arrayIndex<saveddata.length){
            const index = arrayIndex+1;
            setArrayIndex(index);
            return;
        }
    }

    const seebetter = (e)=>{
        setArrayIndex(e);
        setStatus(true);
        // blackdiv.current.className = ""
    }

    useEffect(()=>{
        console.log(arrayIndex);
        

    },[arrayIndex])

    return(
        <div>
        <div className="flex flex-col items-center"  >
        <div style={{fontFamily: 'Roboto sans-serif  '}}  className="flex flex-col items-center gap-2 ring-2 ring-amber-200 m-2 w-[95vw]">
            <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Saved questions of the user',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'See Your',
        1000,
        'Saved Questions',
        1000
      ]}
      wrapper="div"
      speed={50}
      className="md:text-5xl bg-purple-600 text-white w-full text-center sm:text-3xl p-2 md:p-4 font-extrabold text-2xl"
      repeat={Infinity}
    />
            
            
    
            <div className="md:text-2xl max-w-[98vw]">
            {
                saveddata.map((element, index)=>(
                    <div key={index} className="bg-amber-400 gap-2 flex flex-col justify-center  text-blue-950 font-bold m-2">
                        <div className="md:text-3xl text-2xl w-full  bg-gradient-to-tl from-red-700 via-red-800 text-center to-orange-700 text-white" >Q. {element.question.substring(3)}</div>
                        <div className="bg-amber-600 text-black w-full p-1 md:p-2">Ans. {element.correct_optionText}</div>
                        <div className="text-black p-1  w-full sm:p-2">{element.answer}</div>
                        <div className=" bg-yellow-400 m-2 border-2 bg-gradient-to-tl from-lime-700 via-green-800 to-lime-700 border-green-500 p-1 md:p-2 text-2xl  font-bold rounded-md cursor-pointer select-none text-white w-max hover:scale-105" onClick={() => seebetter(index)}>See Question better</div>
                    </div>
                ))
            }
            <div className="flex w-full justify-center">
            <div  className={`m-2 border-2 bg-gradient-to-tl from-violet-700 via-violet-900 to-purple-900 border-pink-500 p-1 w-max md:p-2 sm:text-2xl md:text-3xl font-bold rounded-md cursor-pointer text-2xl select-none text-white hover:scale-105`} onClick={()=>navigate("/")}>New Game</div>
            </div> 
            </div>
            </div>
            </div>
            {status && <div className="fixed inset-0 bg-black/80 z-20"></div>}
            {status &&
            <motion.div initial={{scale:0, opacity:0}}  animate={{scale:1, opacity:100}} transition={{duration:0.08,ease: "linear" }} className=" inset-0 m-auto fixed z-20  bg-gradient-to-tr from-blue-800 via-blue-950 to-cyan-800 text-black ring-2 ring-amber-300 size-80 h-max sm:w-96 sm:max-h-max md:w-3/4 md:h-3/4">
                <div className="md:text-5xl text-2xl sm:text-3xl  w-full bg-gradient-to-tr from-green-700 via-lime-600 to-green-800  p-1 sm:p-2 md:p-3 text-center font-extrabold text-white">Q{arrayIndex+1}</div>
                <div className="absolute sm:top-5 top-2 right-2 cursor-pointer hover:scale-110 bg-amber-200 text-2xl sm:text-2xl md:text-4xl" onClick={()=>setStatus(false)}><CrossMark/></div>
                <div className="flex flex-col">
                <textarea value={"Q. "+saveddata[arrayIndex].question.substring(3)} readOnly className="text-xl resize-none sm:text-3xl p-2 md:text-4xl  font-bold md:mt-1 sm:mt-2 mt-[2px] text-white bg-gradient-to-tr custom-scrollbar2 custom-scrollbar from-red-700 via-red-600 to-red-800 text-center overflow-auto w-full content-center" rows={3} />
                
                <textarea value={"Ans.  "+saveddata[arrayIndex].correct_optionText} readOnly className={`sm:text-xl resize-none  custom-scrollbar3 custom-scrollbar p-2 md:text-3xl text-yellow-500 font-bold md:mt-1 sm:mt-2 mt-[2px] text-center flex  overflow-auto ${answerStatus?"opacity-100":"opacity-0"} w-full content-center `} rows={2} />

                <textarea value={saveddata[arrayIndex].answer} readOnly className={`sm:text-xl resize-none  p-2 md:text-2xl text-blue-700 custom-scrollbar1 bg-cyan-300 font-bold md:mt-1 sm:mt-2 ${answerStatus?"opacity-100":"opacity-0"} mt-[2px] text-center overflow-auto w-full content-center `} rows={3} />

                </div>
                <div className="flex gap-2 p-4 justify-center">
                {arrayIndex!=0 &&(<div className="m-2 border-2 p-1 cursor-pointer md:p-2 sm:text-2xl md:text-3xl flex justify-center items-center bg-gradient-to-br from-lime-800 via-lime-800 to-lime-600 border-pink-400 font-bold select-none rounded-md text-white hover:scale-105" onClick={previousone}><ArrowNextRtl/></div>)}
            {arrayIndex !=saveddata.length-1 &&( <div className="m-2 border-2 p-1 cursor-pointer md:p-2 sm:text-2xl flex justify-center items-center md:text-3xl text-xl bg-gradient-to-br from-green-800 via-emerald-800 to-green-600 border-emerald-400 select-none font-bold rounded-md text-white hover:scale-105" onClick={nextone}><ArrowNextLtr/></div>)}
            <div  className={`m-2 border-2 bg-gradient-to-tl from-violet-700 via-violet-900 to-purple-900 border-pink-500 p-1 md:p-2 sm:text-2xl md:text-3xl font-bold rounded-md cursor-pointer text-xl select-none text-white hover:scale-105`} onClick={()=>navigate("/")}>New Game</div>

            <div className="bg-yellow-400 m-2 border-2 bg-gradient-to-tl from-red-700 via-orange-900 to-orange-200 justify flex justify-center items-center border-pink-500 p-1 md:p-2 sm:text-2xl md:text-3xl font-bold rounded-md cursor-pointer select-none text-xl text-white hover:scale-105 " onClick={()=>setAnswerStatus(!answerStatus)}>{answerStatus?<ViewShow/>:<EyeHideFill16/>}</div>
            </div>
           </motion.div> 
           
            }
            </div>       
        
    )
}
export{Savedquestions}