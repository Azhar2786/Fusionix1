

import { redirect } from "react-router-dom";


import account from "../../lib/appwrite";
import { use } from "react";

const loginLoader = async () => {
    try {
        // Attempt to retrieve the users account information
       await account.get();
        // console.log(user);
        
    } catch (err) {
        console.log(`Error getting user session: ${err.message}`);
        return null;
    }

    // if account retrieval is successful, redirect the user to the home page ('/')
    return redirect('/');
}

export default loginLoader;