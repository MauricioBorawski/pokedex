import {
  Context,
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface NotificationReturnType {
  open: boolean;
  openNotification: () => void;
  closeNotification: () => void;
  onCloseNotification: (callback: () => void) => void;
}

export const NotificationContext = createContext<NotificationReturnType>({
  open: false,
  openNotification: () => {},
  closeNotification: () => {},
  onCloseNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeNotification = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        open,
        openNotification: () => {
          setOpen(true);
        },
        closeNotification,
        onCloseNotification: (callback) => {
          callback();
        },
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (
  context: Context<NotificationReturnType>
) => {
  const { openNotification, onCloseNotification } = useContext(context);

  return { openNotification, onCloseNotification };
};
