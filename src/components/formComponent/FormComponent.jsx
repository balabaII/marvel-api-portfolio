import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './formComponent.scss';


const FormComponent = () => {
    const [character, setCharacter] = useState(null),
        {error, clearError, getCharacterByName } = useMarvelService();

    
    const onCharacterFound = (newCharacter) =>{
        clearError()
        setCharacter( newCharacter );
    };

    const characterUpdate = (name) =>{
        getCharacterByName(name)
            .then( onCharacterFound )
    };

    return (
        <div className='form-component'>
        <Formik
            initialValues={ {name : ''} }
            validationSchema={ Yup.object({
                name: Yup.string().required('The field is required'),
            })}
            onSubmit={ value => characterUpdate( value.name )}>
    
            <Form>
                <label className='form-component__title' htmlFor="name">Enter Hero Name:</label>

                <div className='form-component__flex'>
                    <Field className="form-component__input" 
                        id="name" name="name" type="text" 
                        placeholder="Enter Name"
                        />
                    <button className='button button__main' type='submit'> 
                        <div className="inner">Find</div>
                    </button>
                </div>

                <div className='form-component__flex'>
                    {character ? character.length > 0 ? 
                        <>
                            <Link className='form-component__verity' to={`characters/${character[0].id}`}>
                                There is! Visit {character[0].name} page
                            </Link> 
                            <Link className='button button__secondary' to={`characters/${character[0].id}`}>
                                <div className='inner'>Here</div>
                            </Link> 
                        </> 
                    : null : null}
                </div>
                <FormikErrorMessage className='form-component__error' component="div" name='name'/>
                { character ? !character.length > 0 ? <div className='form-component__error'>The character was not found</div> :null : null }
            </Form>
        </Formik>
        </div>
    )

};


export default FormComponent;