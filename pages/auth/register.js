import RegisterForm from "@/components/layout/RegisterForm";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Register({ toggleTheme, currentTheme }) {
  return (<>
  <RegisterForm />
  <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
  </>);
}
