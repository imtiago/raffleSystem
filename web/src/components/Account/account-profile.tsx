import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export const AccountProfile = (props) => {
  const { user } = useAuth();
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user?.avatarURL}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user?.fullName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user?.email}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {
              user?.roles?.map((role: { label: string }) =>
                role.label
              )?.join('\n')
            }
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Alterar Photo
        </Button>
      </CardActions>
    </Card>
  )
}
