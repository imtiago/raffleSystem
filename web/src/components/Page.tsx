import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------


// interface page extends  HTMLElement{
//   children: HTMLElement,
//   title: string,
// }

const Page = forwardRef<HTMLInputElement>((props, ref) => (
  <>
    <Helmet>
      <title>{props.title || ''}</title>
      {props.meta}
    </Helmet>

    <Box ref={ref} {...props}>
      {props.children}
    </Box>
  </>
));

// Page.propTypes = {
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string,
//   meta: PropTypes.node,
// };

export default Page;
