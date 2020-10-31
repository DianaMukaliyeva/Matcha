import { makeStyles } from '@material-ui/core/styles';

export const btnStyles = makeStyles((theme) => ({
    footerBtn: {
        color: theme.palette.text.secondary,
        '&:hover': { color: theme.palette.primary.main },
        fontSize: 'small',
    },
    likeButton: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '30px',
        '&:hover': { backgroundColor: theme.palette.primary.main },
    },
    chatButton: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
        marginLeft: '10px',
    },
    iconButton: {
        '&:hover span': { color: theme.palette.primary.main },
        '& span.MuiBadge-badge': { color: theme.palette.primary.contrastText },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: { padding: '15px 5px' },
    },
    iconButtonActive: {
        '& span': { color: theme.palette.primary.main },
        '& span.MuiBadge-badge': { color: theme.palette.primary.contrastText },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: { padding: '15px 5px' },
    },
    mainButton: {
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
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
        '&:hover': { backgroundColor: theme.palette.background.default },
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: { padding: '15px 5px' },
    },
    secondButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.secondary,
        '&:hover': { backgroundColor: theme.palette.primary.main },
    },
    linkButton: {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': { color: theme.palette.primary.main, backgroundColor: 'transparent' },
    },
    googleBtn: { border: 'none', backgroundColor: theme.palette.background.secondary },
    input2: {
        width: '95%',
        margin: '10px',
        alignItems: 'center',
        '& label': { color: theme.palette.primary.light, fontSize: '16px' },
        '& input': { textAlign: 'center' },
        '& .MuiOutlinedInput-root': { borderRadius: '30px', width: '100%', fontSize: '16px' },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid ' + theme.palette.primary.light,
        },
    },
    alignCenter: { textAlign: 'center' },
}));
