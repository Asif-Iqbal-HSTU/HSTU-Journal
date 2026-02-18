import Layout from '@/Layouts/Layout.jsx';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes, faChevronUp, faChevronDown, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function EditorIndex({ editors }) {
    const user = usePage().props.auth.user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEditor, setEditingEditor] = useState(null);

    const { data, setData, post, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        designation: '',
        role: 'Associate Editor',
        sort_order: 0,
        image: null,
    });

    const openCreateModal = () => {
        setEditingEditor(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (editor) => {
        setEditingEditor(editor);
        setData({
            name: editor.name,
            designation: editor.designation,
            role: editor.role,
            sort_order: editor.sort_order,
            image: null,
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingEditor) {
            post(route('admin.editors.update', editingEditor.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
                forceFormData: true,
            });
        } else {
            post(route('admin.editors.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
                forceFormData: true,
            });
        }
    };

    const deleteEditor = (id) => {
        if (confirm('Are you sure you want to delete this editor?')) {
            destroy(route('admin.editors.destroy', id));
        }
    };

    const updateOrder = (id, direction) => {
        const index = editors.findIndex(e => e.id === id);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === editors.length - 1) return;

        const newEditors = [...editors];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        const orders = newEditors.map((e, idx) => {
            if (idx === index) return { id: e.id, sort_order: targetIndex };
            if (idx === targetIndex) return { id: e.id, sort_order: index };
            return { id: e.id, sort_order: idx };
        });

        post(route('admin.editors.reorder'), {
            data: { orders },
            preserveScroll: true,
        });
    };

    return (
        <Layout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editorial Board Management</h2>}
        >
            <Head title="Manage Editorial Board" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Current Board Members</h3>
                            <button
                                onClick={openCreateModal}
                                className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 active:bg-primary-900 focus:outline-none focus:border-primary-900 focus:ring ring-primary-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add New Member
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {editors.map((editor, index) => (
                                        <tr key={editor.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {editor.image_path ? (
                                                        <img className="h-10 w-10 rounded-full object-cover" src={editor.image_path} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                            <FontAwesomeIcon icon={faUserTie} />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{editor.name}</div>
                                                <div className="text-sm text-gray-500">{editor.designation}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {editor.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">{editor.sort_order}</span>
                                                    <div className="flex flex-col">
                                                        <button onClick={() => updateOrder(editor.id, 'up')} className="text-gray-400 hover:text-gray-600">
                                                            <FontAwesomeIcon icon={faChevronUp} className="text-[10px]" />
                                                        </button>
                                                        <button onClick={() => updateOrder(editor.id, 'down')} className="text-gray-400 hover:text-gray-600">
                                                            <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openEditModal(editor)} className="text-primary-600 hover:text-primary-900 mr-4">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => deleteEditor(editor.id)} className="text-red-600 hover:text-red-900">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {editors.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                                No board members added yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={submit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        {editingEditor ? 'Edit Board Member' : 'Add New Board Member'}
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Designation & Affiliation</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                                value={data.designation}
                                                onChange={e => setData('designation', e.target.value)}
                                                required
                                            />
                                            {errors.designation && <div className="text-red-500 text-xs mt-1">{errors.designation}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Role in Board</label>
                                            <select
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                                value={data.role}
                                                onChange={e => setData('role', e.target.value)}
                                            >
                                                <option value="Chief Patron">Chief Patron</option>
                                                <option value="Patron">Patron</option>
                                                <option value="Editor-in-Chief">Editor-in-Chief</option>
                                                <option value="Associate Editor">Associate Editor</option>
                                                <option value="Managing Editor">Managing Editor</option>
                                                <option value="Editor">Editor</option>
                                                <option value="Member">Member</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                                            <input
                                                type="number"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                                value={data.sort_order}
                                                onChange={e => setData('sort_order', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                                            <input
                                                type="file"
                                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                                onChange={e => setData('image', e.target.files[0])}
                                            />
                                            {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
