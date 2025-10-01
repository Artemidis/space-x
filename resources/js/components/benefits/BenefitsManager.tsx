import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import BenefitForm from './BenefitForm';
import BenefitsGrid from './BenefitsGrid';

interface Benefit {
    id?: number;
    top_text: string;
    main_value: string;
    bottom_text: string;
    order: number;
    is_active: boolean;
}

interface BenefitsManagerProps {
    benefits: Benefit[];
}

export default function BenefitsManager({ benefits }: BenefitsManagerProps) {
    const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { setData, post, put, delete: destroy, processing } = useForm();

    const nextOrder = benefits.length > 0 ? Math.max(...benefits.map(benefit => benefit.order)) + 1 : 0;

    const handleSubmit = (formData: Benefit) => {
        setData(formData);
        if (editingBenefit && editingBenefit.id) {
            put('/benefits/' + editingBenefit.id, {
                onSuccess: () => {
                    resetForm();
                },
                preserveScroll: true,
            });
        } else {
            post('/benefits', {
                onSuccess: () => {
                    resetForm();
                },
                preserveScroll: true,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Вы уверены, что хотите удалить этот benefit?')) {
            destroy(route('benefits.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (benefit: Benefit) => {
        setEditingBenefit(benefit);
        setIsCreating(false);
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingBenefit(null);
    };

    const resetForm = () => {
        setEditingBenefit(null);
        setIsCreating(false);
    };

    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Управление преимуществами
                </h2>
                <button
                    onClick={handleCreate}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Добавить Benefit
                </button>
            </div>

            {/* Форма создания/редактирования */}
            {(isCreating || editingBenefit) && (
                <BenefitForm
                    editingBenefit={editingBenefit}
                    isCreating={isCreating}
                    onSubmit={handleSubmit}
                    onCancel={resetForm}
                    processing={processing}
                    nextOrder={nextOrder}
                />
            )}

            {/* Сетка benefits */}
            <BenefitsGrid
                benefits={benefits}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
