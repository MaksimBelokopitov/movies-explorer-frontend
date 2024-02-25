
import { nameRegEx, nameErr, nameErrSmall, emailRegEx, emailErr } from '../utils/constants';
import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState({name: true, email: true, password: true});

  const handleChange = (e) => {
    const {name, value} = e.target
    if (value==='') {
      setErrors({...errors, [name]: e.target.validationMessage});
      setIsValid({...isValid, [name]: false});
    }
    else{
      setValues({...values, [name]: value });
      setIsValid({...isValid, [name]: true});
    }
  };

  const handleNameChange = (e) => {
    const {name, value} = e.target
    if(nameRegEx.test(value)&&value.length >= 2){
      setValues({...values, [name]: value });
      setIsValid({...isValid, [name]: true});
    }
    else if(!nameRegEx.test(value)) {
      setErrors({...errors, [name]: nameErr});
      setIsValid({...isValid, [name]: false});
    }
    else if (value.length <2) {
      setErrors({...errors, [name]: nameErrSmall});
      setIsValid({...isValid, [name]: false});
    }
  }

  const handleEmailChange = (e) => {
    const {name, value} = e.target
    if(emailRegEx.test(value)){
      setValues({...values, [name]: value });
      setIsValid({...isValid, [name]: true});

     }
    else if(!emailRegEx.test(value)) {
      setErrors({...errors, [name]: emailErr});
      setIsValid({...isValid, [name]: false});
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, setValues, handleChange, handleNameChange, handleEmailChange, errors, isValid, setIsValid, resetForm };
}

