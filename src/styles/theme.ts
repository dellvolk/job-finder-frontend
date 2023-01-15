import {
	createTheme,
	PaletteColorOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface CustomPalette {
		anger: PaletteColorOptions;
		apple: PaletteColorOptions;
		steelBlue: PaletteColorOptions;
		violet: PaletteColorOptions;
		white: PaletteColorOptions;
	}
	interface Palette extends CustomPalette {}
	interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		anger: true;
		apple: true;
		steelBlue: true;
		violet: true;
		white: true;
	}
}

declare module '@mui/material/TextField' {

  interface TextFieldPropsColorOverrides {
    anger: true;
    apple: true;
    steelBlue: true;
    violet: true;
    white: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor:string) => augmentColor({ color: { main: mainColor } });

const theme = (mode:'light' | 'dark') => createTheme({
  palette: {
    mode,
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
    white: createColor('#FFFFFF'),
  },
});

export default theme
