import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import BenefitsManager from '@/components/benefits/BenefitsManager';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface NavLink {
    id?: number;
    title: string;
    url: string;
    order: number;
    is_active: boolean;
}

interface Benefit {
    id?: number;
    top_text: string;
    main_value: string;
    bottom_text: string;
    order: number;
    is_active: boolean;
}

interface DashboardProps {
    navLinks: NavLink[];
    benefits: Benefit[];
}

export default function Dashboard({ navLinks, benefits }: DashboardProps) {
    const [editingLink, setEditingLink] = useState<NavLink | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        url: '',
        order: 0,
        is_active: true,
    });

    // Инициализация формы при создании новой ссылки
    useEffect(() => {
        if (isCreating) {
            const nextOrder = Math.max(0, ...navLinks.map(link => link.order)) + 1;
            setData({
                title: '',
                url: '',
                order: nextOrder,
                is_active: true,
            });
        }
    }, [isCreating, navLinks, setData]);

    useEffect(() => {
        if (editingLink) {
            setData({
                title: editingLink.title,
                url: editingLink.url,
                order: editingLink.order,
                is_active: editingLink.is_active,
            });
        }
    }, [editingLink, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingLink && editingLink.id) {
            // Обновление существующей ссылки
            put('nav-links/' + editingLink.id, {
                onSuccess: () => {
                    reset();
                    setEditingLink(null);
                }
            });
        } else {
            // Создание новой ссылки
            post('nav-links/', {
                onSuccess: () => {
                    reset();
                    setIsCreating(false);
                }
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Вы уверены, что хотите удалить эту ссылку?')) {
            destroy('nav-links/' + id);
        }
    };

    const cancelEdit = () => {
        setEditingLink(null);
        setIsCreating(false);
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <BenefitsManager benefits={benefits} />
                {/* Секция управления навигационными ссылками */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-gray-800">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Управление навигационными ссылками
                        </h2>
                        <button
                            onClick={() => {
                                setIsCreating(true);
                                setEditingLink(null);
                            }}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Добавить ссылку
                        </button>
                    </div>

                    {/* Форма создания/редактирования */}
                    {(isCreating || editingLink) && (
                        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                {editingLink ? 'Редактирование ссылки' : 'Новая ссылка'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Название
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            URL
                                        </label>
                                        <input
                                            type="text"
                                            id="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="/example"
                                            required
                                        />
                                        {errors.url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Порядок
                                        </label>
                                        <input
                                            type="number"
                                            id="order"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value))}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            min="0"
                                            required
                                        />
                                        {errors.order && (
                                            <p className="mt-1 text-sm text-red-600">{errors.order}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Активная ссылка
                                        </label>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Сохранение...' : (editingLink ? 'Обновить' : 'Создать')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Список существующих ссылок */}
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Название
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    URL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Порядок
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Статус
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Действия
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                            {navLinks.sort((a, b) => a.order - b.order).map((link) => (
                                <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {link.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                        {link.url}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                        {link.order}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    link.is_active
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}
                                            >
                                                {link.is_active ? 'Активна' : 'Неактивна'}
                                            </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                setEditingLink(link);
                                                setIsCreating(false);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => link.id && handleDelete(link.id)}
                                            className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Остальной контент dashboard */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
