import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const DarkMode = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
 <Button
  onClick={toggleTheme}
   size="tinyIcon"
  className=" bg-transparent shadow-none border-none hover:bg-transparent focus:outline-none relative"
>

      <Sun className="h-[1.2rem] w-[1.2rem] text-black rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  hover:text-blue-500"  strokeWidth={1}/>
      <Moon className="absolute h-[1.2rem] w-[1.2rem] text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100  hover:text-blue-500" strokeWidth={1} />
    </Button>

  );
};
export default DarkMode