

import { redirect } from "react-router-dom";


import account from "../../lib/appwrite";


const resetPasswordLoader = async ({ request }) => {
    const url = new URL(request.url);

    try {
        // Attempt to retrieve the users account information
        await account.get();
        // console.log(user);
        
       
        // if account retrieval is successful, redirect the user to the home page ('/')
        return redirect('/'); 
    } catch (err) {
        console.log(`Error getting user session: ${err.message}`);
       
    }

    if (!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
        return redirect('/reset-link');
    }

    return null;
};

export default resetPasswordLoader;