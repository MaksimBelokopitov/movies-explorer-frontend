import { CurrentUserContext } from '../context/CurrentUserContext';
import { NAME_REG_EX, NAME_ERR, NAME_ERR_SMALL, EMAIL_REG_EX, EMAIL_ERR } from '../utils/constants';
import {useState, useCallback, useContext} from 'react';


export function useFormAndValidation() {
  const currentUser = useContext(CurrentUserContext)
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState({name: false, email: false, password: false});
  const [ isNewData, setIsNewData ] = useState({name: false, email: false});

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
    setValues({...values, [name]: value });
    if(NAME_REG_EX.test(value)&&value.length >= 2){
      setIsValid({...isValid, [name]: true});
      if(value === currentUser.name) {
        setIsNewData({...isNewData, [name]: false })
      }
      else {
        setIsNewData({...isNewData, [name]: true })
      }
    }
    else if(!NAME_REG_EX.test(value)) {
      setErrors({...errors, [name]: NAME_ERR});
      setIsValid({...isValid, [name]: false});
    }
    else if (value.length <2) {
      setErrors({...errors, [name]: NAME_ERR_SMALL});
      setIsValid({...isValid, [name]: false});
    }
  }

  const handleEmailChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    if(EMAIL_REG_EX.test(value)){
      setIsValid({...isValid, [name]: true});
      if(value === currentUser.email) {
        setIsNewData({...isNewData, [name]: false })
      }
      else {
        setIsNewData({...isNewData, [name]: true })
      }
     }
    else if(!EMAIL_REG_EX.test(value)) {
      setErrors({...errors, [name]: EMAIL_ERR});
      setIsValid({...isValid, [name]: false});
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, setValues, isNewData, handleChange, handleNameChange, handleEmailChange, errors, isValid, setIsValid, resetForm };
}

