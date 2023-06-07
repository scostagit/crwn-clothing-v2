import { useState } from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
};

import './sign-up-form.styles.scss';

const SignUpForm = ()=>{

    const[formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 
 
    
    const handleChange =  (event)=>{        
       const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value});
    };

    const resetForm = ()=>{
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !==  confirmPassword){
            alert("passwords do not match");
            return;
        }

        try {
           const {user} = await createAuthUserWithEmailAndPassword(email,password);

           await createUserDocumentFromAuth(user,{displayName});
                  
           resetForm();

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert("Cannot create user, email already in use");
            }else{
                console.log('user creation encountered an error' + error);
            }            
        }
        
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

             <FormInput label="Display Name"            
                        name="displayName" 
                        required 
                        value={displayName} 
                        onChange={handleChange}/>
            
             <FormInput label="Email" 
                        type="email" 
                        name="email" 
                        required 
                        value={email} 
                        onChange={handleChange}/>
             
             <FormInput label="Password"  
                    type="password" 
                    name="password" 
                    required 
                    value={password} 
                    onChange={handleChange}/>
            
             <FormInput label="Confirm Password"
                        name="confirmPassword" 
                        required 
                        value={confirmPassword} 
                        onChange={handleChange}/>

             <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;