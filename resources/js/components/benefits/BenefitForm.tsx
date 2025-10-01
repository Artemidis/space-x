import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Benefit {
    id?: number;
    top_text: string;
    main_value: string;
    bottom_text: string;
    order: number;
    is_active: boolean;
}

interface BenefitFormProps {
    editingBenefit?: Benefit | null;
    isCreating: boolean;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    processing: boolean;
    nextOrder?: number;
}

export default function BenefitForm({
    editingBenefit,
    isCreating,
    onSubmit,
    onCancel,
    processing,
    nextOrder = 0,
}: BenefitFormProps) {
    const { data, setData, errors } = useForm({
        top_text: '',
        main_value: '',
        bottom_text: '',
        order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (editingBenefit) {
            setData({
                top_text: editingBenefit.top_text,
                main_value: editingBenefit.main_value,
                bottom_text: editingBenefit.bottom_text,
                order: editingBenefit.order,
                is_active: editingBenefit.is_active,
            });
        } else if (isCreating) {
            setData({
                top_text: '',
                main_value: '',
                bottom_text: '',
                order: nextOrder,
                is_active: true,
            });
        }
    }, [editingBenefit, isCreating, nextOrder, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                {editingBenefit ? 'Редактирование benefit' : 'Новый benefit'}
            </h3>

            {/* Preview */}
            <div className="mb-4 rounded-md border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
                <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Предпросмотр:
                </h4>
                <div className="white-gradient-box w-full pt-4 pb-6 text-center text-white">
                    <p className="text-sm">
                        {data.top_text || 'Верхний текст'}
                    </p>
                    <p className="mb-[-10px] text-3xl font-bold">
                        {data.main_value || 'Цифра'}
                    </p>
                    <p className="text-sm">
                        {data.bottom_text || 'Нижний текст'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                        label="Верхний текст"
                        id="top_text"
                        type="text"
                        value={data.top_text}
                        onChange={(value) => setData('top_text', value)}
                        error={errors.top_text}
                        placeholder="мы"
                        required
                    />

                    <FormField
                        label="Основное значение"
                        id="main_value"
                        type="text"
                        value={data.main_value}
                        onChange={(value) => setData('main_value', value)}
                        error={errors.main_value}
                        placeholder="1"
                        required
                    />

                    <FormField
                        label="Нижний текст"
                        id="bottom_text"
                        type="text"
                        value={data.bottom_text}
                        onChange={(value) => setData('bottom_text', value)}
                        error={errors.bottom_text}
                        placeholder="на рынке"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        label="Порядок"
                        id="order"
                        type="number"
                        value={data.order}
                        onChange={(value) =>
                            setData('order', parseInt(value) || 0)
                        }
                        error={errors.order}
                        min="0"
                        required
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label
                            htmlFor="is_active"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                            Активный benefit
                        </label>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                        {processing
                            ? 'Сохранение...'
                            : editingBenefit
                              ? 'Обновить'
                              : 'Создать'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

// Вспомогательный компонент для полей формы
interface FormFieldProps {
    label: string;
    id: string;
    type: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    min?: string;
}

function FormField({
    label,
    id,
    type,
    value,
    onChange,
    error,
    placeholder,
    required,
    min,
}: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder={placeholder}
                required={required}
                min={min}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
