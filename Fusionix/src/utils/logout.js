import account from "../lib/appwrite";


/**
 * Logs out the current user by deleting their session and navigate to the login page.
 * 
 * @async
 * @function logout
 * @param {Fuction} navigate - the navigatiion function to redirect the user after logout.
 * @returns {Promise<void>} - Returns a promise that resolves once the sessioon is delted and navigation occurs.
 * @throws {Error} if there is an issue delting the user session, the error will be logged to the console.
 */

const logout = async (navigate) => {
    try {
        
        await account.deleteSession('current');
    } catch (err) {
        return console.log(`Error deleting user session: ${err.message}`);
    }

    return navigate('/login')
};

export default logout;