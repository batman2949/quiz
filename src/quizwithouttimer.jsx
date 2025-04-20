import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { ArrowNextRtl } from "./previous";
import { ArrowNextLtr } from "./next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiurl = import.meta.env.VITE_API_URL;

function QuizWithoutTimer() {
    const [input, setInput] = useState("");
    const[questionarray, setQuestionarray] = useState([]);
    let [index, setIndex] = useState(0);
    const[status, setStatus]=useState(false);
    // here for options buttons click instead of true and false use a number instead 
    const[buttonClick, setButtonClick]=useState([]); // the option we have pressed
    // so here buttonCLick will be assigned an array  which helps in tracking which button is clicked
    const[score, setScore] = useState(0);
    const[scoreTracker, setScoreTracker] = useState(0);
    // const[correctAnnswe]
    const[submitNewGame,setSubmitNewGame] = useState(false);
    const[ques,setQues] = useState("");
    const[letsgos, setLetsgos] = useState(true);
    const[submitted,setSubmitted] = useState(true);
    const[check, setCheck]=  useState(false);
    const[checkingprogress, setCheckingprogess] = useState(false);
    const navigate = useNavigate();
    const[questionsQuestionarray,setQuestionsQuestionarray]= useState([]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleQues=(e)=>{
        setQues(e.target.value);
    }

    const clearselectedoption=()=>{
        const array = [...buttonClick];
        array[index]={
            "option":'',
            "text":"",
            "position":null
        }
        setButtonClick(array);
    }

    useEffect(()=>{
        console.log(buttonClick); 
    },[buttonClick])
    async function ai() {
        if(ques<=0|| ques>26){
            toast.warn("question limit should be between 0 and 26", {
                className: "!bg-red-800 !text-white !font-bold !rounded-lg !shadow-lg",
                bodyClassName: "!text-white !text-center",
                progressClassName: "!bg-yellow-200",
                theme: "dark"})
            setQues(0);
            return;
        }
        if(input==""){
            toast.warn("No topic",{
                className: "!bg-red-800 !text-white !font-bold !rounded-lg !shadow-lg",
                bodyClassName: "!text-white !text-center",
                progressClassName: "!bg-yellow-200",
                theme: "dark"} );
            return;
        }
        try {
            setLetsgos(false);
            const response = await fetch(apiurl,  // ✅ Use Gemini endpoint
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"  // ✅ Gemini header
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: `Generate a JSON ${ques} questions array object based mcq question with 4 options based on ${input} based on the format  
                                    {"question":question number. question, "option1":option1 ,"option2":option2,"option4":option4}, "option4":option4,"correct_option":correct option in the form of option1 option2 option3 option4,
                                    "correct_optionText":correct option in the form of text, "answer_explain":answer explanation  } `}  // ✅ Send text as content
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();

            // ✅ Handle the response properly
            if (data?.candidates && data.candidates.length > 0) {
                console.log("AI Response:", data.candidates[0]?.content?.parts[0]?.text);
                let dataArray =   data.candidates[0]?.content?.parts[0]?.text;
                  // ✅ Remove backticks and trim extra whitespace
                  dataArray = dataArray.replace(/```json|```/g, "").trim();

                  console.log(dataArray);
                const parseddata = await JSON.parse(dataArray);
                setQuestionarray(parseddata);
                setStatus(true);
                setButtonClick(new Array(parseddata.length).fill({option: "", position: null}));
                setQuestionsQuestionarray(prev => [...prev, ...parseddata.map(q => q.question)]);
                console.log(questionsQuestionarray);
                                

            } else {
                console.warn("No valid response received.");
            }

        } catch (err) {
            console.error("Error:", err);
        }
        setLetsgos(true);
    }

    useEffect(()=>{
        if(index===questionarray.length-1){
            setSubmitNewGame(true);
        }else
        setSubmitNewGame(false);
    },[index, questionarray.length])

    const nexttopic=()=>{
        if(index<questionarray.length-1){
        setIndex(index+1);
    }
    }

    const previoustopic=()=>{
        if(index>0){
            setIndex(index-1);
        }else
        toast.warn("we are in the first question now ");
    }

    const submit=()=>{
        let scores = 0;
        let scoretracker = 0
        // let i =0;
        buttonClick.forEach((element, indice)=>{
            console.log(element);
            console.log(questionarray[indice].correct_option);
            
            if(element.option===questionarray[indice].correct_option){
                scores = scores+1;
                console.log(scores);
                scoretracker = scoretracker+1;
                console.log(scoretracker);                
            }else{
                console.log(scores);
                scoretracker = scoretracker+1;
                console.log(scoretracker);
            }
        })
        setSubmitted(false);
        setScore(scores);
        setScoreTracker(scoretracker);
        setCheck(true);
        
    }

   useEffect(()=>{
    console.log(ques);
    
   },[ques])

    const newGame=()=>{
        setStatus(false);
        setIndex(0);
        setQuestionarray([]);
        setButtonClick([]);
        setScoreTracker(0);
        setInput("");
        setQues(0);
        setScore(0);
        setTotalTime(0);
        setActiveTime(0);
        timerRef.current=null;
    }


    useEffect(()=>{
        if(scoreTracker == questionarray.length && scoreTracker!=0)
            toast.success(`Your score is ${score}`,{
                className: "!bg-red-700 !text-white !font-bold !rounded-lg !shadow-lg",
                bodyClassName: "!text-white !text-center",
                progressClassName: "!bg-amber-400",
                theme: "dark",
              })
    },[scoreTracker])

    const checkMarks=()=>{
        navigate("/quizanswercheck",{state:{"index":index,"questionarray":questionarray,"buttonClick":buttonClick, "checkingprogress":checkingprogress, "score":score}});
        setCheckingprogess(true);
        
    }

    return (
        <div style={{fontFamily: 'Roboto sans-serif  '}} className="bg-none min-h-screen flex flex-col justify-center items-center max-w-screen ">
            <div className="bg-gradient-to-tl from-yellow-300 via-orange-400 to-amber-400 margin-auto inset-0 w-[90vw] sm:w-[85vw]  md:w-[60vw] h-max sm:h-[80vh] md:h-[95vh] sm:overflow-y-auto flex flex-col justify-start items-center relative">
                
            {/* <div className="font-bold text-center p-5 md:mb-5 sm:mb-3 text-5xl sm:text-6xl md:text-7xl bg-purple-900 w-full text-white">Welcome to Quiz</div> */}
            <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'WELCOME TO',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'AIQZONE',
        2000,
        'AN ONLINE',
        3000,
        "QUIZ GAME",
        3000
      ]}
      wrapper="div"
      speed={50}
      className="font-bold text-center p-5 md:mb-5 sm:mb-3 text-5xl sm:text-6xl md:text-7xl bg-purple-900 w-full text-white"
      repeat={Infinity}
    />
            {!status &&(
                    <div className="flex flex-col justify-center items-center h-11/12 gap-9">
                    <div>
                        <textarea
                            value={input}
                            onChange={handleInput}
                            className="field-sizing-content resize-none  w-full sm:max-w-[50vw] sm:max-h-[23vh] max-w-[70vw] max-h-[350px] m-2  p-4 text-white bg-gradient-to-br from-black via-blue-900 to-blue-950 outline-2 text-2xl sm:text-3xl md:text-4xl  outline-amber-950 text-center "
                            placeholder="Type Topic Name"
                        />
                        </div>
                        <div className="text-center p-2 mt-2">
                        <div className="text-blue-950 text-2xl sm:text-3xl font-bold text-center mb-2 ">Type Number of Questions[1 - 26]</div>
                        <input type="number"
                            value={ques}
                            onChange={handleQues}
                            className="p-2 text-white bg-gradient-to-br from-black via-blue-900 to-blue-950 outline-2 text-2xl  outline-amber-950 text-center w-1/3 "
                            placeholder="Enter number of questions"
                        />
                        </div>
                        <div
                            className={`ring-2 ring-white p-2 md:p-5 rounded-3xl text-2xl bg-gradient-to-bl select-none sm:text-4xl md:text-4xl hover:scale-105 text-center from-red-600 via-red-800 to-red-900 w-auto ${letsgos?"cursor-pointer":"cursor-progress opacity-75"}`}
                            onClick={ai}>{letsgos?"Lets Go!!!":"Loading..."}</div>
                            <div>
                        <div className="underline cursor-pointer md:text-3xl font-bold text-center text-blue-900 hover:text-blue-700 md:p-2" onClick={()=>{navigate("/")}}>Wanna give quiz with timer? Click here </div>
                        </div>
            </div>
            )}
            {/*Question array*/}
            {status &&(
                <div className="p-2 text-center w-full">
            <div className="text-xl  sm:text-3xl max-w-full p-2 md:text-4xl text-black font-bold md:mt-1 cursor-pointer sm:mt-2 mt-[2px] sm:text-center  w-full content-center" >{questionarray[index].question}</div>
           
            <div className="flex flex-col items-center md:mt-3 sm:mt-2  select-none gap-2 md:text-3xl text-xl md:gap-6">
            <div className={`border-2 text-center w-full sm:w-[300px] md:w-[400px] font-bold cursor-pointer  p-1 md:p-2 ${buttonClick[index].position==1?" bg-gradient-to-br from-red-800 via-red-900 to-red-950":"border-2 bg-gradient-to-br  text-blue-950  from-yellow-300  to-yellow-500 border-red-950"} `} onClick={
                ()=>{
                    const array = [...buttonClick];
                    array[index] = 
                    {
                        "option":"option1",
                        "text":questionarray[index].option1,
                        "position":1
                    };
                    setButtonClick(array);
                }
                } >{questionarray[index].option1}</div>

<div className={`border-2 w-full sm:w-[300px] md:w-[400px] font-bold text-center cursor-pointer select-none p-1 md:p-2 ${buttonClick[index].position==2?" bg-gradient-to-br  from-red-800 via-red-900 to-red-950":"border-2 bg-gradient-to-br text-blue-950  from-yellow-300 to-yellow-500 border-red-950"} `} onClick={
                ()=>{
                    const array = [...buttonClick];
                    array[index] = 
                    {
                        "option":"option2",
                        "text":questionarray[index].option2,
                        "position":2
                    };
                    setButtonClick(array);
                }
                } >{questionarray[index].option2}</div>

<div className={`border-2 w-full sm:w-[300px] md:w-[400px] font-bold text-center cursor-pointer p-1 select-none md:p-2 ${buttonClick[index].position==3?" bg-gradient-to-br  from-red-800 via-red-900 to-red-950":"border-2 bg-gradient-to-br  text-blue-950  from-yellow-300 to-yellow-500 border-red-950"} `} onClick={
                ()=>{
                    const array = [...buttonClick];
                    array[index] = 
                    {
                        "option":"option3",
                        "text":questionarray[index].option3,
                        "position":3
                    };
                    setButtonClick(array);
                }} >{questionarray[index].option3}</div>

<div type="button" className={`border-2 w-full sm:w-[300px] md:w-[400px] text-center max-w-full font-bold  select-none cursor-pointer p-1 md:p-2 ${buttonClick[index].position==4?" bg-gradient-to-br from-red-800 via-red-900 to-red-950":"border-2 bg-gradient-to-br text-blue-950  from-yellow-300 to-yellow-500 border-red-950"} `}   onClick={
                ()=>{
                    const array = [...buttonClick];
                    array[index] = 
                    {
                        "option":"option4",
                        "text":questionarray[index].option4,
                        "position":4
                    };
                    setButtonClick(array);
                }} >{questionarray[index].option4}</div>
                {/* to make onkeyDown work for a div we use tabIndex={0} */ }
                <div className="flex justify-center items-center gap-2 md:relative -top-3">
            {index>0&&<div className="bg-gradient-to-tl p-2 rounded-md from-black via-blue-950 to-violet-950 hover:bg-blue-950 hover:scale-105 sm:text-3xl text-2xl mt-1 text-center cursor-pointer select-none" onClick={previoustopic}><ArrowNextRtl/></div>}
            {index!=questionarray.length-1&&<div onClick={nexttopic} className="bg-gradient-to-tl sm:text-3xl mt-1 text-2xl p-2 rounded-md from-black via-blue-950 ring-2 ring-white to-violet-950 hover:bg-blue-950 cursor-pointer text-center select-none hover:scale-105"><ArrowNextLtr/></div>}
            <div onClick={clearselectedoption} className="bg-gradient-to-tl from-violet-800 via-violet-950 font-bold text-white ring-2 ring-white to-violet-900  p-2 mt-1 text-2xl sm:text-3xl rounded-md cursor-pointer text-center select-none">Clear</div>
            </div>
            
            </div>
            {submitNewGame&&(<div className="flex justify-center align-center md:text-2xl text-xl relative top-8 md:top-0 bg-black ">
                <div onClick={submit} className={`m-2 border-2 ${submitted ?"cursor-pointer":"cursor-no-drop opacity-75"} p-1 select-none md:p-2 sm:text-2xl md:text-3xl bg-gradient-to-br from-green-800 via-emerald-800 to-green-600 border-emerald-400 font-bold rounded-md `}>Submit</div>
            <div onClick={newGame} className={`m-2 border-2 bg-gradient-to-tl from-violet-700 via-violet-900 to-purple-900 border-pink-500 p-1 md:p-2 sm:text-2xl md:text-3xl font-bold rounded-md cursor-pointer select-none hover:scale-105`}>New Game</div>
            {check&& <div className={`m-2 border-2 bg-gradient-to-tl from-red-700 via-red-900 ring-2 ring-white rounded-md to-red-800 border-pink-500 p-1 ${checkingprogress?"cursor-progress opacity-75":"cursor-pointer"} md:p-2 sm:text-2xl md:text-3xl font-bold cursor-pointer select-none`} onClick={checkMarks}>Check Marks</div>}
            </div>)}

            
        </div>
        )}
        </div>
        </div>
    );
}

export { QuizWithoutTimer };
