import React, { useEffect, useRef, useState } from 'react'
import { steps } from '../data'

const CheckoutStepper = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
    });
    const stepRef = useRef([])
   
    useEffect(()=> {
        setMargins( {
            marginLeft: stepRef.current[0].offsetWidth/2,
            marginRight: stepRef.current[steps.length - 1].offsetWidth/2,
        });
    }, [stepRef.current]);


    if(!steps.length) return(<div>No data available</div>)



    const handleNext = ()=> {
        setCurrentStep(prevStep => {
            if(prevStep === steps.length) {
                setIsCompleted(true);
                return prevStep;
            }
            else {
                return prevStep+1;
            }
        })
    }

    const calculateProgressBarWidth = ()=> {
        return((currentStep-1)/(steps.length-1)) * 100;
    }

    const ActiveComponent = steps[currentStep - 1]?.Component;
    console.log(ActiveComponent)

  return (

    <>
    <div className='stepper'>
        {
            steps.map((step,index)=> {
                return(
                    <div key={step.name}
                    ref={(el)=>(stepRef.current[index] = el)}
                     className={`step ${currentStep>index+1 || isCompleted ? 'complete' : ''} ${currentStep === index+1 ? 'active' : ''}`}>
                        <div className='step-number'>{
                            currentStep > index + 1 || isCompleted ? (<span>&#10003;</span>) : (index+1)}</div>
                        <div className='step-name'>{step.name}</div>
                    </div>
                )
            })
        }

    <div className='progress-bar' style={{width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
    marginLeft: margins.marginLeft,
    marginRight: margins.marginRight}}>
        <div className='progress' style={{width:`${calculateProgressBarWidth()}%`}}></div>
    </div>

    </div>

<div className='btnComponent'>
    <ActiveComponent />

    { !isCompleted  && (
     <button className='btn' onClick={handleNext}>{currentStep === steps.length ? 'Finish' :  'Next'}</button>
    )}
    </div>
    </>
  )
}

export default CheckoutStepper