import Swal from "sweetalert2";

// Configuração global do SweetAlert2 com tema escuro
const darkSwal = Swal.mixin({
  background: "#1F1F21",
  color: "#FFFFFF",
  confirmButtonColor: "#39BE00",
  cancelButtonColor: "#E93030",
  customClass: {
    popup: "swal-dark-popup",
    title: "swal-dark-title",
    htmlContainer: "swal-dark-text",
    confirmButton: "swal-dark-confirm",
    cancelButton: "swal-dark-cancel",
  },
});

export default darkSwal;
