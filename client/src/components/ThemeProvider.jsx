/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";


function ThemeProvider({ children }) {
    const theme = useSelector(state => state.theme.theme);
  return (
    <div className= {theme}>
        <div className="text-gray-700 bg-white dark:bg-black dark:text-white">

            {children}
        </div>

    </div>
  )
}

export default ThemeProvider