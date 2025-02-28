

import { redirect } from "react-router-dom";
import { getConversationTitle, getAiResponse } from "../../api/googleAi";
import account from "../../lib/appwrite";
import { databases } from "../../lib/appwrite";



import generateID from "../../utils/generateID";
// import conversationAction from "./conversationAction";

const userPromptAction = async (formData) => {
    const userPrompt = formData.get('user_prompt');
    // console.log(userPrompt);

    // Get current user info
    const user = await account.get();

    // Get a conversation title based on user prompt
    const conversationTitle = await getConversationTitle(userPrompt);
    // console.log(conversationTitle);
    let conversation = null;

    try {
        // create a new conversation document in the Appwrite database
        conversation = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            generateID(),
            {
                title: conversationTitle,
                user_id: user.$id,
            }
        )
    } catch (err) {
        console.log(`Error creating conversation: ${err.message}`);
        
    }

    // Generate an AI response based on user's prompt
    const aiResponse = await getAiResponse(userPrompt);
    // console.log(aiResponse);
    try {
        // Create a new chat document in the 'chats' collection
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversation.$id,
            },
        )
    } catch (err) {
        console.log(`Error creating chat: ${err.message}`);
        
    }
    
    
    return redirect(`/${conversation.$id}`);
};

/**
 * Deletes a conversation document from the database and returns the conversation title.
 * 
 * @async
 * @function conversationAction
 * @param {FormData} formData- The form data containing the conversations details.
 * @returns {Promise<Object>} Returns an object containing the conversation title after deletion
 * @throws will throw an error if the deletion process fails
 */

const conversationAction = async (formData) => {
    const conversationId = formData.get('conversation_id');
    const conversationTitle = formData.get('conversation_title');

    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId,
        );

        return { conversationTitle };
    } catch (err) {
        console.log(`Error in deleting conversation: ${err.message}`);
    }
}  


/**
 * Handles incoming requests based on the 'request_type' from data.
 * @async
 * @function appAction
 * @param {Object} request - The incoming request object containiing the form data.
 * @returns {Promise<*>} - Returns the result of the action based on the request_type (e.g, 'userPromptAction' or ' conversationAction) 
 **/

const appAction = async ({ request }) => {
    const formData = await request.formData();
    const requestType = formData.get('request_type');

    // console.log(requestType);
    if(requestType === 'user_prompt') {
        return await userPromptAction(formData);
    }

    if(requestType === 'delete_conversation') {
        return await conversationAction(formData);
    }
    
};

export default appAction;