import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const primaryColor = {
    main: '#ca416e',
    light: '#ff749c',
    dark: '#950043',
    contrastText: '#fff',
};

export const theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: {
            main: '#0e1125',
            light: '#34374d',
            // main: '#000000',
            // light: '#2c2c2c',
            dark: '#000000',
            contrastText: '#fff',
        },
        text: {
            primary: '#b5bad3',
            secondary: '#fff',
        },
        background: {
            default: 'rgb(12, 16, 35, 0.95)',
        },
    },
    typography: {
        fontFamily: 'El Messiri, sans-serif',
        h2: {
            color: '#219bf1',
            fontWeight: 400,
            paddingBottom: '.5rem',
        },
    },
    overrides: {
        MuiToggleButton: {
            root: {
                '&$selected, &$selected:hover': {
                    backgroundColor: primaryColor.main + ' !important',
                },
                margin: '5px',
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: primaryColor.light,
                },
                '& .MuiToggleButton-label': {
                    color: 'black',
                    fontSize: '20px',
                    textTransform: 'lowercase',
                },
            },
        },
    },
});

export const useStyles = makeStyles(theme => ({
    root: {
        width: '75%',
        margin: '15px',
        padding: '5px',
    },
    customRadio: {
        color: 'black',
    },
    radio: {
        maxWidth: '300px',
        borderRadius: '30px !important',
        [theme.breakpoints.down('xs')]: {
            width: '200px',
        },
    },
    customButton: {
        margin: '10px',
        fontSize: '16px',
        textTransform: 'capitalize',
        padding: '21px 30px 17px',
        borderRadius: '30px',
        marginBottom: '4px',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        minWidth: '170px',
        fontWeight: '700',
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    hoverTransparent: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    customTransparentButton: {
        margin: '10px',
        fontSize: '16px',
        textTransform: 'capitalize',
        padding: '21px 30px 17px',
        borderRadius: '30px',
        marginBottom: '4px',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        minWidth: '170px',
        fontWeight: '500',
        color: '#fff',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    customIconButton: {
        '&:hover $span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    customHeader: {
        color: '#fff',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    text: {
        fontSize: '10px',
    },
    pr: {
        paddingRight: '5px',
    },
    p2: {
        padding: '15px',
    },
    img: {
        width: '40px',
        padding: '0 5px',
    },
    circle: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%',
        },
        alignItems: 'center',
    },
    customSelect: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '3px',
        height: '40px',
        fontSize: 20,
        width: '300px',
        [theme.breakpoints.down('xs')]: {
            width: '200px',
        },
    },
    customInput: {
        // width: '100%',
        margin: '5px',
        // backgroundColor: 'transparent',
        '& label': {
            color: theme.palette.secondary.main,
            fontSize: '20px',
            // marginLeft: '25%',
        },
        '& input': {
            textAlign: 'center',
        },
        '& label.Mui-focused': {
            // marginLeft: 0,
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'grey',
            borderRadius: '30px',
            backgroundColor: '#fff',
            color: theme.palette.secondary.main,
            width: '100%',
            fontSize: '20px',
            borderWidth: 2,
        },
        // '& $div': {
        //     justifyContent: 'center',
        //     '& $input': {
        //         width: '30%',
        //     },
        // },
        // '& $p': {
        //     alignSelf: 'center',
        // },
    },
}));
