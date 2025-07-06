import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ErrorAlertProps {
  error: Error | null;
  onClose?: () => void;
}

export const ErrorAlert = ({ error, onClose }: ErrorAlertProps) => {
  const [open, setOpen] = useState(!!error);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Collapse in={open && !!error}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Error</AlertTitle>
        {error?.message || 'An unknown error occurred'}
      </Alert>
    </Collapse>
  );
};