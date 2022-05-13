import '../styles/globals.css'
import { Provider } from 'react-redux'
import {ThemeProvider} from "@mui/material";
import store from '../src/store/store'
import {theme} from "../src/components/UI/Theme";

function MyApp({ Component, pageProps }) {
  return(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
