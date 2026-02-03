import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function PublicationEthics() {
    return (
        <PublicLayout>
            <Head title="Publication Ethics Guidelines" />

            <div className="bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                        BAUST Journal: Publication Ethics Guidelines
                    </h1>

                    <div className="prose prose-lg text-gray-500 max-w-none text-justify">
                        <p className="lead">
                            At BAUST Journal, we are committed to upholding the highest ethical standards in scientific publishing. These guidelines are established to ensure the integrity, credibility, and quality of the research disseminated through our journal. Authors, editors, and reviewers are expected to adhere to these principles to maintain the ethical fabric of scholarly communication.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Adherence to Ethical Standards</h3>
                        <p>BAUST Journal aligns with the Committee on Publication Ethics (COPE) guidelines, emphasizing ethical conduct throughout the publication process. We prioritize transparency, fairness, and accountability.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Article Assessment</h3>
                        <p>All submitted manuscripts undergo a comprehensive peer review process to guarantee academic excellence. Our team may seek external advice on submissions with notable ethical implications, such as those involving security, biosecurity, or societal impacts.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Plagiarism</h3>
                        <p>Authors are strictly prohibited from using the words, figures, or ideas of others without proper attribution. To prevent plagiarism, all manuscripts undergo a thorough check using tools like PlagScan. Plagiarism is generally not allowed however, a similarity of up to 15% is allowed. The decision to reject a manuscript due to plagiarism rests with the handling editor.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Duplicate Submission and Redundant Publication</h3>
                        <p>BAUST Journal considers only original content that has not been previously published. Simultaneous submission elsewhere or redundant publication is not tolerated and may result in rejection or sanctions.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Citation Manipulation</h3>
                        <p>Authors are expected to use citations for legitimate academic purposes. Any manipulation of citations, such as including references solely to inflate citation counts, is considered unethical.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Fabrication and Falsification</h3>
                        <p>Authors found to have fabricated or falsified results, including the manipulation of images, will face sanctions. Published articles with such issues may be retracted to maintain the trust and credibility of our journal.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Authorship and Acknowledgments</h3>
                        <p>All listed authors must have made a significant scientific contribution, approving the claims presented in the manuscript. Author contributions should be transparently communicated, and any conflicts of interest must be disclosed.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Conflicts of Interest</h3>
                        <p>Authors, editors, and reviewers must declare all potential conflicts of interest, including financial, affiliations, intellectual property, personal, ideology, and academic connections. Transparency in declaring conflicts allows for informed decisions during the review process.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Editors and Reviewers</h3>
                        <p>Editors and reviewers are expected to recuse themselves from submission if they have conflicts or affiliations with the authors. Reviewers must declare any remaining interests in the confidential section of the review form.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Sanctions</h3>
                        <p>Breaches of ethical standards may result in various sanctions, including rejection of the manuscript, submission bans, and prohibition from acting as an editor or reviewer. Severe violations may incur additional sanctions determined by the editorial board.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Investigations</h3>
                        <p>Suspected breaches of publication ethics should be reported to the BAUST Journal editorial team. Anonymous reporting is facilitated to encourage openness and the fair assessment of ethical concerns.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Corrections and Retractions</h3>
                        <p>Errors identified in published articles will be addressed through corrigenda or errata. Severe errors or misconduct may require retraction following COPE Retraction Guidelines. Authors will be involved in the process, and corrections will be made transparently.</p>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium">These comprehensive guidelines are fundamental to maintaining the credibility, quality, and ethical standards of BAUST Journal. Adherence to these principles is crucial for fostering a culture of integrity in scientific research and scholarly publishing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
