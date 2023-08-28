import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContentList = (process, Component, addDataLoading) =>{
    switch(process){
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return  addDataLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error("something went completely wrong");
    };
};

export default setContentList;