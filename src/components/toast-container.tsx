import { ToastContainer, Zoom, type ToastContainerProps } from "react-toastify";

export const CustomToastContainer: React.FC<ToastContainerProps> = () => (
    <ToastContainer
        autoClose={1000}
        closeButton={false}
        closeOnClick
        limit={3}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position="bottom-right"
        rtl={false}
        theme="dark"
        transition={Zoom} />
)