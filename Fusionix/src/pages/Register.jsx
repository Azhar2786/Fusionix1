/**
 * Node Modules
 */
import { Link, Form, useNavigation, useActionData  } from "react-router-dom";
import { useEffect } from 'react';
import { AnimatePresence } from "framer-motion";


import { banner, icon } from '../assets'


/**
 * hooks
 */
import { useSnackbar } from "../hooks/useSnackbar";



/**
 * Components
 */

import PageTitle from "../components/PageTitle";
import TextField from "../components/TextField";
import { Button } from "../components/Button";
import { CircularProgress, LinearProgress } from "../components/Progress";


function Register() {

    // Get error datta from form submission using useActionData (from react router)
    const error = useActionData();
    // console.log(error);
    

    // Get navigation state r.g loading/submitting etc
    const navigation = useNavigation();
    // console.log(navigation.state);

    const { showSnackbar } = useSnackbar();

    useEffect(() => {
      // Show snackbar with the provided error message
      if(error?.message) {
        showSnackbar({ message: error.message, type: 'error'})
      }
    }, [error, showSnackbar])
    
    

  return (
    <>
        <PageTitle title='Create an account'/>
        

        <div className="relative w-screen h-dvp p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2">
            <div className="flex flex-col p-4">
                
                <Link
                    to={'/'}
                    className="max-w-max mb-auto mx-auto lg:mx-0"
                >
                    <img 
                     src={icon} 
                     alt="logo"
                     width={134}
                     height={25}
                     className="max-w-max mx-auto lg:mx-0"
                    />
                </Link>

                <div className="flex flex-col gap-2 max-w-[480px] w-full mx-auto">
                    <h2 className="text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center">Create an account</h2>

                    <p className="text-bodyLarge text-light-onSurfaceVariant
                    dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2">
                        Sign up today and unlock powerful tools to bring your ideas to life like never before!  
                    </p>

                    <Form
                     method="POST"
                     className="grid grid-cols-1 gap-4"
                    >
                    <TextField 
                        type='text'
                        name='name'
                        label='Full name'
                        placeholder='Full name'
                        required={true}
                        autoFocus={true}
                    />

                    <TextField
                        type='email'
                        name='email'
                        label='Email'
                        placeholder='Email'
                        required={true}
                    />

                    <TextField
                        type='password'
                        name='password'
                        label='Password'
                        placeholder='Enter your password'
                        required={true}
                    />
                    
                    <Button type='submit' disabled={navigation.state === 'submitting'}>
                        {navigation.state  === 'submitting'
                        ? (<CircularProgress size="small"/>)
                        : 'Create account'}
                        
                    </Button>
                    </Form>


                    <p className="text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4">
                        Already have an account

                        <Link
                         to='/login'
                         className="link text-labelLarge inline-block ms-1 "
                        >
                            Sign in
                        </Link>
                    </p>
                
                </div>

                <p className="mt-auto mx-auto text-light-onSurfaceVariant
                dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0">&copy; 2025 Azhar. All right reserved.</p>
            </div>

            <div className="hidden lg:block lg:relative lg:rounded-large img-box">
                <img 
                 src={banner} 
                 alt="banner" 
                 className="img-cover" 
                />

                <p className="absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]">Chat with Fusionix to bring your ideas to life like never before!  </p>
            </div>
        </div>

        <AnimatePresence>
            {navigation.state === 'loading' && (
                <LinearProgress classes="absolute top-0 left-0 right-0"/>     
            )};
        </AnimatePresence>
        
                       
    </>
  );
}

export default Register
