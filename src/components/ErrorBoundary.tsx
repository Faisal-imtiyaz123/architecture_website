import { Button } from '@nextui-org/react';
import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

// Define the props for the ErrorFallback component
interface ErrorFallbackProps extends FallbackProps {}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ resetErrorBoundary}) => {
 const navigate = useNavigate()
  return (
    <div>
      <div className="w-screen  justify-center flex h-screen">
        <div className="">
            <div className="text-[5rem] mt-[30vh] font-bold blue-gradient-text">
              Error Occured!
            </div>
            <div className="flex justify-center gap-2 items-center tracking-wider">
           <div>
            </div>  
            <Button onClick={()=>{
                resetErrorBoundary()
                navigate('/')
            }} className="blue-gradient">Return Home</Button>
            <Button onClick={()=>window.location.reload()}>Try again</Button>
            </div>
        </div>
        
    </div>   
    </div>
  );
};

const AppErrorBoundary = ({children}:{children:React.ReactNode})=>{
    return (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
           
          }}
        >
         {children}
        </ErrorBoundary>
      );

}
  


export default AppErrorBoundary;
