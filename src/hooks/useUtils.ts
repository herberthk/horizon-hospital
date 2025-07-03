import { useEffect, useState } from "react";

export const useFullYear = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return currentYear;
};
