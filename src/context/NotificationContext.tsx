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
  content: ReactNode;
  notificationContent: (newContent: ReactNode) => void;
  openNotification: () => void;
  closeNotification: () => void;
  onCloseNotification: (callback: () => void) => void;
}

export const NotificationContext = createContext<NotificationReturnType>({
  open: false,
  content: undefined,
  notificationContent: (newContent: ReactNode) => {},
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
  const [content, setContent] = useState<ReactNode>(undefined);

  const closeNotification = () => {
    setOpen(false);
  };

  const notificationContent = (newContent: ReactNode) => {
    setContent(newContent);
  };

  return (
    <NotificationContext.Provider
      value={{
        open,
        content,
        notificationContent,
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
  const {
    open,
    content,
    notificationContent,
    openNotification,
    onCloseNotification,
    closeNotification,
  } = useContext(context);

  return {
    open,
    content,
    notificationContent,
    openNotification,
    onCloseNotification,
    closeNotification,
  };
};
