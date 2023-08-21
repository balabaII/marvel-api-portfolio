import { Link  } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () =>{
    return (
        <div>
            <ErrorMessage/>
            <p> The page doesn't exist</p>
            <Link to='/'>Back to Main Page</Link>
        </div>
    );
};

export default Page404;