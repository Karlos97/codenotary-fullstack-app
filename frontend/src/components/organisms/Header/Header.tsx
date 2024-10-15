import ThemeButton from '@atoms/ThemeButton/ThemeButton';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 p-1 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="flex justify-end items-center">
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
