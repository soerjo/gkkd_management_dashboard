export const drawerTheme = {
  defaultProps: {
    size: 300,
    overlay: true,
    placement: "left",
    overlayProps: undefined,
    className: "",
    dismiss: undefined,
    onClose: undefined,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  styles: {
    base: {
      drawer: {
        position: "fixed",
        zIndex: "z-[9999]",
        pointerEvents: "pointer-events-auto",
        backgroundColor: "bg-green",
        boxSizing: "box-border",
        width: "w-full",
        boxShadow: "shadow-2xl shadow-blue-gray-900/10",
      },
      overlay: {
        position: "absolute",
        inset: "inset-0",
        width: "w-full",
        height: "h-full",
        pointerEvents: "pointer-events-auto",
        zIndex: "z-[9995]",
        backgroundColor: "bg-black",
        backgroundOpacity: "bg-opacity-60",
        //   backdropBlur: "backdrop-blur-sm",
      },
    },
  },
};
