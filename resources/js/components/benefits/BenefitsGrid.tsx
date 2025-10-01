interface Benefit {
    id?: number;
    top_text: string;
    main_value: string;
    bottom_text: string;
    order: number;
    is_active: boolean;
}

interface BenefitsGridProps {
    benefits: Benefit[];
    onEdit: (benefit: Benefit) => void;
    onDelete: (id: number) => void;
}

export default function BenefitsGrid({ benefits, onEdit, onDelete }: BenefitsGridProps) {
    const sortedBenefits = [...benefits].sort((a, b) => a.order - b.order);

    return (
        <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Список benefits ({sortedBenefits.length})
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {sortedBenefits.map((benefit) => (
                    <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {sortedBenefits.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Нет добавленных benefits
                </div>
            )}
        </div>
    );
}

// Компонент карточки benefit
interface BenefitCardProps {
    benefit: Benefit;
    onEdit: (benefit: Benefit) => void;
    onDelete: (id: number) => void;
}

function BenefitCard({ benefit, onEdit, onDelete }: BenefitCardProps) {
    return (
        <div className="relative rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
            {/* Preview */}
            <div className="white-gradient-box mb-3 w-full pt-4 pb-6 text-center text-white">
                <p className="text-sm">{benefit.top_text}</p>
                <p className="mb-[-10px] text-2xl font-bold">{benefit.main_value}</p>
                <p className="text-sm">{benefit.bottom_text}</p>
            </div>

            {/* Info */}
            <div className="mb-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div>Порядок: {benefit.order}</div>
                <div>Статус: {benefit.is_active ? 'Активен' : 'Неактивен'}</div>
            </div>

            {/* Actions */}
            <div className="flex justify-between space-x-2">
                <button
                    onClick={() => onEdit(benefit)}
                    className="flex-1 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                >
                    Редакт.
                </button>
                <button
                    onClick={() => benefit.id && onDelete(benefit.id)}
                    className="flex-1 rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                >
                    Удалить
                </button>
            </div>

            {/* Status indicator */}
            {!benefit.is_active && (
                <div className="absolute right-2 top-2">
                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold text-red-800 dark:bg-red-800 dark:text-red-100">
                        Неактивен
                    </span>
                </div>
            )}
        </div>
    );
}
