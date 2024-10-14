import useDarkMode from "@hooks/useDarkMode";
import Button from "@atoms/Button/Button";
import MoonIcon from "@atoms/Icons/Moon";
import SunIcon from "@atoms/Icons/Sun";

const ThemeButton = () => {
  const [theme, setTheme] = useDarkMode();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md dark:bg-yellow-500"
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeButton;
