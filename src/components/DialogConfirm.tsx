type DialogConfirmProps = {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export function DialogConfirm({ message, onCancel, onConfirm }: DialogConfirmProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Si el click fue directamente sobre el fondo (no dentro del cuadro)
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/50 bg-opacity-50 z-50"
            onClick={handleBackdropClick}>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 text-center">
                <p className="text-gray-800 mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}