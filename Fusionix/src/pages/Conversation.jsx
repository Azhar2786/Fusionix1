
import { motion } from "framer-motion";
import { useLoaderData, useLocation } from "react-router-dom";


import { usePromptPreloader } from "../hooks/userPromptPreloader";

import PageTitle from "../components/PageTitle";
import UserPrompt from "../components/UserPrompt";
import AiResponse from "../components/AiResponse";
import PromptPreloader from "../components/PromptPreloader";

const Conversation = () => {

  /**
   * Extrat the conversation data (title and chats) from the loader data,
   * handling potential undefined values using optional chaning
   */

  const { conversation : {title, chats } ,} = useLoaderData() || {};
    // console.log(data);

  // Retrieve the prompt preloader value using the custom hook.  
  const { promptPreloaderValue } = usePromptPreloader();

  // Obtain the current URL loccation information using the useLocation hook.
  const location = useLocation();


    
  return (
    <>
      {/* Meta title */}
      <PageTitle title={`${title} | Fusionix`} />
      
      <motion.div 
        className="max-w-[700px] mx-auto !will-change-auto"
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat) => (
            <div key={chat.$id}>
                {/* User Prompt */}
                <UserPrompt text={chat.user_prompt} />

                {/* AiResponse */}
                <AiResponse aiResponse={chat.ai_response}/>
            </div>
        ))}
      </motion.div>

       {promptPreloaderValue && (
          <PromptPreloader promptValue={promptPreloaderValue}/>
       )} 
     
    </>
  )
}

export default Conversation;