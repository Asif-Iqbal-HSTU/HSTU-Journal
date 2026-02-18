import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Guidelines() {
    return (
        <PublicLayout>
            <Head title="Guidelines" />

            <div className="bg-white py-16 sm:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                        Author Guidelines
                    </h1>

                    <div className="prose prose-blue prose-lg text-gray-500">
                        <p>
                            Authors are invited to submit their research papers to BAUST Journal. Papers should be original and not currently under review by any other publication.
                        </p>

                        <h3>Submission Process</h3>
                        <ol>
                            <li>Register an account on our website.</li>
                            <li>Navigate to the Dashboard and click "New Manuscript".</li>
                            <li>Fill in the required details and upload your manuscript (DOCX/PDF).</li>
                            <li>Track your submission status via the Dashboard.</li>
                        </ol>

                        <h3>Manuscript Formatting</h3>
                        <ul>
                            <li><strong>Font:</strong> Times New Roman, 12pt.</li>
                            <li><strong>Margins:</strong> 1 inch on all sides.</li>
                            <li><strong>References:</strong> IEEE style.</li>
                        </ul>

                        <h3 className="mt-12">Review Process</h3>
                        <p>
                            All submissions undergo a double-blind peer review process. The reviewers' identity remains anonymous to the author, and vice versa.
                            The typical review period is 4-6 weeks.
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
