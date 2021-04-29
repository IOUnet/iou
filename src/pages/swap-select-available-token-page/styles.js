import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    listSection: {
      padding: theme.spacing(1, 0.5),
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
    },
  });

export default styles;
