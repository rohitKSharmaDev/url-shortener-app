import { UrlState } from "@/Context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react";
import { useFetch } from "@/hooks/UseFetch";
import { logOut } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";


const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogOut} = useFetch(logOut);

  return (
    <>
      <nav className="p-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.webp" alt="Trimmer URL Shortner Logo" className="h-16" />
        </Link>

        <div>
          {
            !user ?
              <Button onClick={() => navigate("/auth")}>Login</Button> 
              : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage src={user?.user_metadata?.profile_pic} className='object-contain' />
                      <AvatarFallback>RO</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="flex">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        <span>My Links</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400" onClick={() => {
                      fnLogOut().then(() => {
                        fetchUser();
                        navigate("/");
                      });

                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              )
          }
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;