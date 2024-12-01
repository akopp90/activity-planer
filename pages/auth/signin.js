import Login from "@/components/layout/Login";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function SignIn({ toggleTheme, currentTheme }) {
  return (
  <>
  <Login />
  <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
  </>);
}
