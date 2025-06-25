
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 p-0 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/25 border-2 border-sky-200 dark:border-sky-700"
    >
      <div className="absolute inset-0.5 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <Sun className="h-4 w-4 rotate-0 scale-100 text-sky-600 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-sky-400 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      </div>
    </Button>
  )
}
