import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';


const Savedquestionsdilogbox=()=>{
    const[saveddata,setSaveddata] = useState([]);
    const[index, setIndex] = useState(0);
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
    
        

    return(
        <div className="flex flex-col items-center">
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
      className="md:text-5xl bg-purple-600 w-full text-center sm:text-3xl p-2 md:p-4 font-extrabold text-2xl"
      repeat={Infinity}
    />
            
            
    
            {saveddata.length > 0 && index < saveddata.length &&(
            <div className="flex sm:flex-row gap-5 justify-center items-center h-1/4  flex-col flex-wrap ">
  <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/4 md:size-1/2 ${!saveddata[index] && "hidden"}`}>
    <div>{saveddata[index]?"Q. "+saveddata[index].question.substring(3):""}</div>
    <div>{saveddata[index].correct_optionText?saveddata[index].correct_optionText:""}</div>
    <div>{saveddata[index].answer?saveddata[index].answer:""}</div>
  </div>

  <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/4 md:size-1/2 ${!saveddata[index+1] && "hidden"}`}>
    <div>{saveddata[index+1]?saveddata[index+1].question.substring(3):""}</div>
    <div>{saveddata[index+1].correct_optionText?saveddata[index+1].correct_optionText:""}</div>
    <div>{saveddata[index+1].answer?saveddata[index+1].answer:""}</div>
  </div>

  <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/4 md:size-1/2 ${!saveddata[index+2] && "hidden"}`}>
    <div>{saveddata[index+2]?saveddata[index+2].question.substring(3):""}</div>
    <div>{saveddata[index+2].correct_optionText?saveddata[index+2].correct_optionText:""}</div>
    <div>{saveddata[index+2].answer?saveddata[index+2].answer:""}</div>
    </div>

    <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/4 md:size-1/2 ${!saveddata[index+3] && "hidden"}`}>
    <div>{saveddata[index+3]?saveddata[index+3].question.substring(3):""}</div>
    <div>{saveddata[index+3].correct_optionText?saveddata[index+3].correct_optionText:""}</div>

    <div>{saveddata[index+3].answer?saveddata[index+3].answer:""}</div>
    </div>

    <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/2 md:size-1/2 ${!saveddata[index+4] && "hidden"}`}>
    <div>{saveddata[index+4]?saveddata[index+4].question.substring(3):""}</div>
    <div>{saveddata[index+4].correct_optionText?saveddata[index+4].correct_optionText:""}</div>
    <div>{saveddata[index+4].answer?saveddata[index+4].answer:""}</div>    
  </div>

  <div className={`md:text-2xl border-2 border-e-amber-400 sm:w-1/2 md:size-1/2 ${!saveddata[index+5] && "hidden"}`}>
    <div>{saveddata[index+5]?saveddata[index+5].question.substring(3):""}</div>
    <div>{saveddata[index+5].correct_optionText?saveddata[index+5].correct_optionText:""}</div>
    <div>{saveddata[index+5].answer?saveddata[index+5].answer:""}</div>    
  </div>

  </div>
  
  
)}

</div>
</div>
        
    )
}
export{Savedquestionsdilogbox}