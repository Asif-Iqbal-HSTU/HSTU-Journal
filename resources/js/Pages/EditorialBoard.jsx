import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EditorialBoard({ boardMembers }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user && auth.user.role === 'admin';

    return (
        <PublicLayout>
            <Head title="Editorial Board" />

            {/* Header */}
            <div className="bg-primary-900 py-16 sm:py-24 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {isAdmin && (
                        <div className="mb-8 flex justify-center">
                            <Link
                                href={route('admin.editors.index')}
                                className="inline-flex items-center px-6 py-3 bg-accent hover:bg-yellow-500 text-primary-900 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 gap-2"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                                Manage Editorial Board
                            </Link>
                        </div>
                    )}
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Editorial Board
                    </h1>
                    <p className="mt-4 text-xl text-primary-200 max-w-2xl mx-auto">
                        Distinguished academicians guiding the scientific direction of BAUST Journal.
                    </p>
                </div>
            </div>

            {/* Board Members List */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-16">
                    {boardMembers.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-primary-900 border-l-4 border-primary-500 pl-3">
                                    {section.role}
                                </h2>
                            </div>
                            <div className="p-6">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                    {section.members.map((member, mIdx) => (
                                        <li key={mIdx} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                {member.image_path ? (
                                                    <img src={member.image_path} className="h-12 w-12 rounded-full object-cover border-2 border-primary-100" />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {member.designation}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
