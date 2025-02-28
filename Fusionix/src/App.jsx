
import { motion } from "framer-motion"

import PageTitle from "./components/PageTitle"

import { useToggle } from "./hooks/useToggle"
import { useSnackbar } from "./hooks/useSnackbar"

import TopAppBar from "./components/TopAppBar"
import Sidebar from "./components/Sidebar"
import PromptField from "./components/PromptField"
import Greetings from "./pages/Greetings"
import { Outlet, useParams, useNavigation, useActionData } from "react-router-dom"
import { useEffect, useRef } from "react"
import { usePromptPreloader } from "./hooks/userPromptPreloader"


function App() {
  // Get the URL parameters.
  const params = useParams();

  // Access the navigation state.
  const navigation = useNavigation();

  // Get the data passed froma from action.
  const actionData = useActionData();

  /**
   * Create a reference to an HTML element,
   * likely used to interact with the chat history
   */
  const chatHistoryRef = useRef();


  /**
   * Use a custom hook to manage the sidebar open state.
   * 'isSidebarOpen' holds the current state, 
   * and ' togglesidebar' is a function to toggle the sidebar.
   */
  const [isSidebarOpen, toggleSidebar] = useToggle();
//k
  /**
   * Access the prompt preloader state,
   * particulary the value for prompt preloading.
   */
  const { promptPreloaderValue } = usePromptPreloader();

  const { showSnackbar } = useSnackbar();

  /**
   * This useEffect hook is triggered whenever the 'promptPreLoaderValue' or 'chatHistoryRef' changes.
   * Inside the hook, we get the current HTML element referenced by 'chatHistoryRef'.
   * Then, we check if 'promptPreLoaderValue'is true, indicating that a new message is beign loaded.
   * if it's true, we smoothly scroll the chat history to the bottom.
   * This ensures that the latest message is always visible after loading new content.
   */
  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (promptPreloaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, promptPreloaderValue]);

  // show sncakbar after deleting a conversation
  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted '${actionData.conversationTitle}' conversation.`,
      });
    }
  }, [actionData, showSnackbar]);

  /**
   * Check if the current navigation state is 'loading' and if there is no form data associated with the navigation.
   * This condition typically signifies a normal page load,
   * where the page is loading for the first time or is being reloaded without submiiting a from
   */

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <>
      <PageTitle title='Fusionix - Know About Anything'/>

      <div className="lg:grid lg:grid-cols-[320px,1fr]">
        {/* Sidebar */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}      
        />

        <div className="h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]">
          {/* Top app bar */}
          <TopAppBar toggleSidebar={toggleSidebar}/>

          {/* Main content */}
          <div ref={chatHistoryRef} className="px-5 pb-5 flex flex-col overflow-y-auto">
            <div className="max-w-[840px] w-full mx-auto grow">
              {isNormalLoad ? null : params.conversationId ?(
                <Outlet /> // Conversation
              ) : (
                <Greetings />
              )}
            </div>
          </div>

          {/* Prompt feild */}
          <div className="bg-light-background
          dark:bg-dark-background">
            <div className="max-w-[870px] px-5 w-full max-auto">
              <PromptField/>

              <motion.p 
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay:0.8, ease: 'easeOut' }}
                className="text-bodySmall text-center
                text-light-onSurfaceVariant
                dark:text-dark-onSurfaceVariant p-3"
              >
                Fusionix may display inaccurate info,
                including about people, so double-check its responses.
                <a href="https://support.google.com/gemini?p=privacy_notice" target="_blank" className="inline underline ms-1">
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
