import error from '../../assets/error.gif';


const ErrorMessage = () =>{
    return (
        <img src={error} alt="error gif" 
            style={ { 
                display:'block', 
                width: "250px", 
                height:"250px", 
                objectFit:"contain", 
                margin:"0 auto"
            } }/>
    );//return 
};

export default ErrorMessage;