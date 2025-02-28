
import { redirect } from "react-router-dom";


import  account  from "../../lib/appwrite";
import generateID from "../../utils/generateID";


const registerAction = async ({ request }) => {
    // Retrieve the form data from the incoming request
    const formData = await request.formData();
    // console.log(formData.get('name'));
    // console.log(formData.get('email'));
    // console.log(formData.get('password'));

    try {
        // creates a new user account using the provided email, password, and more
        await account.create(
            generateID(), // generates a unique ID for the user
            formData.get('email'),
            formData.get('password'),
            formData.get('name'),

        );
    } catch (err) {
        return {
            message: err.message,
        }
    }

    // After successfully account create, login the user with the provided email and password
    try {
        // Creates a session for the new user with the provided email and password
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password'),
        );
    } catch (err) {
        // Logs any error encountered during session creation and redirect to login  page
        console.log(`Error creating email session:  ${err.message}`);
        return redirect('/login');
        
    }

    // Redirected the users to tthe home page upon successful registration and login
    return redirect('/');
    
};


export default registerAction;