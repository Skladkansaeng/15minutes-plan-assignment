import { usePathname, useRouter } from "next/navigation";

const AppBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <div className="h-[64px] bg-gray-300 flex  justify-between px-10 align-center">
      <button
        className=""
        onClick={() =>
          pathname !== "/login" && pathname !== "/signup" && router.push("/")
        }
      >
        Home
      </button>
      <div className="flex flex-col align-center justify-center">
        {pathname !== "/login" && pathname !== "/signup" && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => router.push("/logout")}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
