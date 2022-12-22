
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import { useMediaQuery} from '@material-ui/core';

const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const [zoom, setZoom] = useState(3.5);

  useEffect(() => {
    setZoom(isSmallScreen ? 2 : 3.5);
  }, [isSmallScreen]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00bcd4',
      },
      secondary: {
        main: '#ff5722',
      },
    },
  });