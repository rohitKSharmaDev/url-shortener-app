import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>

      <footer>
        <div className="p-10 text-center bg-gray-800 mt-10 text-white">
          Made with ❤ by Rohit Sharma
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;