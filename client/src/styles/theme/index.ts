import { extendTheme } from '@chakra-ui/react';
// imagem urbana color: #6298ae
const theme = extendTheme({
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: '#6298ae',
      },
    },
  },
});

export default theme;
