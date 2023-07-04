import { FunctionComponent, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

export type NotificationType = "success" | "error" | "warning" | "info";

export const Notification: FunctionComponent<{
  children: ReactNode;
  open: boolean;
  type: NotificationType;
  onClose: () => void;
}> = ({ children, open, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={12000}
      onClose={() => {
        onClose();
      }}
    >
      <Alert
        onClose={() => {
          onClose();
        }}
        severity={type}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};
