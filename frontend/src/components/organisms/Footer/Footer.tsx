import { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return (
    <footer className="sticky bottom-0 py-4 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-end">{children}</div>
    </footer>
  );
};

export default Footer;
