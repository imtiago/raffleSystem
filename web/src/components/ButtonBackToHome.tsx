import { Button } from '@mui/material';

// ----------------------------------------------------------------------

// Iconify.propTypes = {
//   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//   sx: PropTypes.object,
// };

export default function ButtonBackToHome() {
  return (
    <Button href="/" variant="contained">
      {'site principal'}
    </Button>
  );
}
