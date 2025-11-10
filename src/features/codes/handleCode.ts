import { toast } from 'sonner';
import { CodeType } from './codeTypes';

export function handleCode(code: string) {
    // success className: "bg-[#E6F6E6] text-[#1A7F37] border border-[#B2E3B2]"
    // error className: "bg-[#FDE9E9] text-[#B42318] border border-[#F5B4B4]"
    switch (code) {
        case CodeType.BOOK_CREATED:
            toast.success('Libro creado correctamente.', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;

        case CodeType.BOOK_UPDATED:
            toast.success('Libro modificado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;

        case CodeType.BOOK_DELETED:
            toast.success('Libro eliminado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;

        case CodeType.USER_CREATED:
            toast.success('Usuario creado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;
        case CodeType.USER_UPDATED:
            toast.success('Usuario modificado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;
        case CodeType.USER_DELETED:
            toast.success('Usuario eliminado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;
        case CodeType.PASSWORD_UPDATED:
            toast.success('Contraseña modificado correctamente', {
                style: {
                    background: "#E6F6E6",
                    color: "#1A7F37",
                    border: "1px solid #B2E3B2"
                }
            });
            break;

        case CodeType.ERROR:
            toast.error("Error ❌", {
                style: {
                    background: "#FDE9E9",
                    color: "#B42318",
                    border: "1px solid #F5B4B4"
                }
            });
            break;

        default:
            break;
    }
}