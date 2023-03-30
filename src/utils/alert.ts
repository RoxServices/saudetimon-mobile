import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);

const swAlert = (
  icon: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined,
  title = '',
  text = '',
  confirmButtonText = 'OK',
  showCancelButton = false,
  cancelButtonText = 'CANCELAR',
  confirmButtonColor = '#2196f3'
): Promise<SweetAlertResult> =>
  mySwal.fire({
    icon,
    title,
    text,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
    allowOutsideClick: false,
    reverseButtons: true,
    confirmButtonColor,
  });

export default swAlert;
