import { toast } from 'react-toastify';

export const toastSuccess = (message) => {
    toast.success(message, { className: "green accent-4" })
}

export const toastError = (message) => {
    toast.error(message, { className: "red darken-1" })
}