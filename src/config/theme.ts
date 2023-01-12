import { createTheme, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        drawerWidth: {
            expanded: {
                xs: number,
                sm: number,
            }
            collapsed: {
                xs: number,
                sm: number,
            }
        };
    }
}

const baseTheme: ThemeOptions = createTheme({
    mixins: {
        drawerWidth: {
            expanded: {
                sm: 200,
                xs: 200
            },
            collapsed: {
                sm: 81,
                xs: 57,
            }
        }
    },
});

export default baseTheme;
