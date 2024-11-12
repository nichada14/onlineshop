import Swal from "sweetalert2";

interface AlertProps {
  title: string;
  text: string;
  icon: "success" | "error";
}

const Alert = async ({ title, text, icon }: AlertProps) => {
  await Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
  });
};

export const successCreateAlert = () => {
  return Alert({
    title: "Success!",
    text: "Create product successfully.",
    icon: "success",
  });
};

export const errorCreateAlert = () => {
  return Alert({
    title: "Error!",
    text: "Failed to create product. Please try again.",
    icon: "error",
  });
};

export const successUpdateAlert = () => {
  return Alert({
    title: "Success!",
    text: "Product updated successfully.",
    icon: "success",
  });
};

export const errorUpdateAlert = () => {
  return Alert({
    title: "Error!",
    text: "Update failed. Please check your input.",
    icon: "error",
  });
};

export const errorUpdateGeneralAlert = () => {
  return Alert({
    title: "Error!",
    text: "Update failed. Please try again.",
    icon: "error",
  });
};

export default Alert;
