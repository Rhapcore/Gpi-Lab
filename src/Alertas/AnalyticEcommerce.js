import PropTypes from 'prop-types';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCard from '../Tablas/MainCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, extra, cliente }) => (
    <MainCard contentSX={{ p: 2 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        <Box sx={{ pt: 2}}>
            <Typography color="textSecondary"  variant="h5" >
                <Typography variant="h5" component="span"  sx={{ color: `${color || 'primary'}.main` }}>
                {cliente} 
                </Typography>{'  '}
                {extra} 
            </Typography>
        </Box>
    </MainCard>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'secondary'
};

export default AnalyticEcommerce;
