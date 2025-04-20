import { useLocation, useNavigate } from "react-router-dom";
// import { Tick } from "./tick";
import { useEffect, useState } from "react";
import { Tick } from "./tick";
import { CrossMark } from "./cross";
import { ArrowNextLtr } from "./next";
import { ArrowNextRtl } from "./previous";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckAnswer(){
    const location = useLocation(); // location an object. inside location object a state object is there 
    // inside state object we have keys like index, questionarray, buttonClick, checkingprogress 
    const{state} = location;
    const{questionarray, buttonClick, checkingprogress, score} = state;
    console.log(questionarray);
    console.log(buttonClick);
    const[index,setIndex] = useState(0);
    const[nexts, setNexts] = useState(true);
    const[previouss, setPreviouss] = useState(true);
    const navigate = useNavigate();
    const[questionsave,setQuestionsave] = useState(()=>{
        const saveddata = localStorage.getItem("array");
        if(saveddata)
            return JSON.parse(saveddata);
        else
        return [];  // initially in future already questionsave and the data stored in localStorage is an array
    });
    const next=()=>{
        if(index<questionarray.length-1){
            setIndex(index+1);
        }else{
        setNexts(false);
    }
    }

    const newgame=()=>{
        navigate("/");       
    }

    const previous=()=>{
        if(index>0){
            setIndex(index-1);
        }else{
        setPreviouss(false);
        }
    }
    const savequestion=()=>{
        let object={
            "question":questionarray[index].question,
            "correct_option":questionarray[index].correct_option,
        "answer":questionarray[index].answer_explain,
        "correct_optionText":questionarray[index].correct_optionText
        };
        const dataArray = [...questionsave];
        dataArray.push(object);
        setQuestionsave(dataArray);
        try{
            localStorage.setItem("array",JSON.stringify(dataArray));
            toast.success("saved the question");
        }catch(err){
            toast.error("can't save the question");
            console.log(err);
            
        }
    }
    
    return (
        <div className="flex flex-col items-center m-2" style={{fontFamily: 'Roboto sans-serif  '}} >
                <div className="bg-gradient-to-br w-[88vw] h-auto border-2 flex flex-col justify-start gap-3 md:gap-5 items-center ring-2 ring-yellow-300 from-yellow-500 via-yellow-400 to-yellow-200">
                <div className="w-full">
                <div className="bg-gradient-to-bl from-violet-600 via-violet-600 to-violet-800 md:text-5xl text-3xl w-full p-2 text-center sm:p-3 font-bold ">Check your answers</div>
                <div className="md:text-5xl text-3xl bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-center w-full font-bold">SCORE {score}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 via-blue-950 to-blue-800 p-2 md:text-2xl text-xl  text-white ring-2 ring-blue-400 select-none font-bold cursor-pointer flex text-center rounded-full" onClick={savequestion}>save question</div>
                <div className="w-full sm:text-4xl text-xl p-1 sm:p-2 ">
                <textarea value={questionarray[index].question} readOnly className="text-center content-center resize-none h-auto w-full custom-scrollbar1 custom-scrollbar1  text-blue-950 font-bold"/>
                </div>
               
                <div className="flex flex-wrap flex-col md:flex-row gap-1 md:gap-4">
                    <div>
                    <textarea value={questionarray[index].option1} readOnly className={`w-max resize-none text-bold content-center text-center custom-scrollbar  text-black font-bold  md:text-xl ${buttonClick[index].text==questionarray[index].option1?"bg-gradient-to-br from-red-800 via-red-900 to-red-500 text-white":"bg-gradient-to-tl from-white to-orange-400"} `} />
                    </div>
                    <div>
                    <textarea value={questionarray[index].option2} readOnly className={`w-max resize-none text-bold content-center text-center custom-scrollbar  select-none cursor-pointer text-black font-bold md:text-xl ${buttonClick[index].text==questionarray[index].option2?"bg-gradient-to-br from-red-800 via-red-900 to-red-500 text-white":"bg-gradient-to-tl from-white to-orange-400"}`} />
                    </div>
                    <div>
                    <textarea value={questionarray[index].option3} readOnly className={`w-max resize-none  content-center text-center text-black custom-scrollbar  font-bold select-none cursor-pointer md:text-xl ${buttonClick[index].text==questionarray[index].option3?"bg-gradient-to-br from-red-800 via-red-900 to-red-500 text-white":"bg-gradient-to-tl from-white to-orange-400"}`} />
                    </div>
                    <div>
                    <textarea value={questionarray[index].option4} readOnly className={`w-max resize-none text-bold content-center custom-scrollbar  text-center select-none cursor-pointer text-black font-bold md:text-xl ${buttonClick[index].text==questionarray[index].option4?"bg-gradient-to-br from-red-800 via-red-900 to-red-500 text-white":"bg-gradient-to-tl from-white to-orange-400"}`} />
                    </div>
                    </div>

                    {buttonClick[index].option===questionarray[index].correct_option?
                    <div className="bg-gradient-to-br from-black rounded-full p-2 sm:text-3xl text-2xl md:text-5xl via-blue-800 to-blue-950 w-max text-white "><Tick/></div>:<div className="bg-white rounded-full sm:text-3xl text-2xl p-2 md:text-5xl w-max text-white"><CrossMark/></div>}
                    {buttonClick[index].option!=questionarray[index].correct_option?<div className="text-2xl text-center text-white select-none bg-gradient-to-br from-red-600 via-red-800 to-orange-600 p-2">Correct option - {questionarray[index].correct_option}</div>:<div></div>}
                    <textarea value={questionarray[index].answer_explain} readOnly className="w-full resize-none text-center content-center md:text-2xl font-black text-violet-950 border-2 border-black p-1 custom-scrollbar"/>
            
                <div className="flex justify-center items-center gap-2">
                    {index>0&&<div className="m-2 border-2 cursor-pointer p-1 select-none md:p-2 sm:text-2xl md:text-3xl bg-gradient-to-br from-green-800 via-emerald-800 to-green-600 border-emerald-400 font-bold text-xl rounded-md" onClick={previous}><ArrowNextRtl/></div>}
                    {index<questionarray.length-1 && <div className="m-2 border-2 bg-gradient-to-tl from-red-700 via-red-900 ring-1 ring-red-500 rounded-md to-red-800 border-pink-500 p-1 text-xl
md:p-2 sm:text-2xl md:text-3xl font-bold cursor-pointer select-none" onClick={next}><ArrowNextLtr/></div>}
                <div onClick={newgame} className={`m-2 border-2 bg-gradient-to-tl from-violet-700 via-violet-900 to-purple-900 border-pink-500 p-1 md:p-2 sm:text-2xl md:text-3xl font-bold rounded-md cursor-pointer select-none text-xl`}>New Game</div>
                </div>
                </div>
                <div className="hover:text-blue-300 text-blue-400 underline text-3xl p-2 font-bold w-full text-center hover:cursor-pointer" onClick={()=>navigate("/saveddata")}>Wanna See your Saved Questions? Click Here</div>
                <div className="top-5 relative flex mb-2">
                <div className="min-h-8  w-8 bg-gradient-to-tl from-red-700 via-red-900 to-red-800 border-2"></div>
              <div className="items-center ml-2 ">= The ticked option/ Your answer</div>
                </div>
        </div>
    )
}
export{CheckAnswer};