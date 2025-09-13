import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ChatBot from "./ChatBot";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <motion.main 
          className="flex-1 p-6 overflow-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>

      <ChatBot />
    </div>
  );
};

export default Layout;