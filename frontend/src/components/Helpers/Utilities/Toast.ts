import toast from "react-hot-toast";

export const succesToast = (text: string) => {
  toast.success(text, {
    style: {
      border: "1px solid #FFFAEE",
      padding: "16px",
      color: "#FFFAEE",
      backgroundColor: "#3a8fd9",
    },
    iconTheme: {
      primary: "#FFFAEE",
      secondary: "#3a8fd9",
    },
  });
};
export const greenToast = (text: string) => {
  toast.success(text, {
    style: {
      border: "1px solid #FFFAEE",
      padding: "16px",
      color: "#FFFAEE",
      backgroundColor: "#41D7A7",
    },
    iconTheme: {
      primary: "#FFFAEE",
      secondary: "#41D7A7",
    },
  });
};
export const alertToast = (text: string) => {
  toast.error(text);
};
export const removedToast = (text: string) => {
  toast.success(text, {
    style: {
      border: "1px solid #FFFAEE",
      padding: "16px",
      color: "#FFFAEE",
      backgroundColor: "#FD7E14",
    },
    iconTheme: {
      primary: "#FFFAEE",
      secondary: "#FD7E14",
    },
  });
};

