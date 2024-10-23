import {Head, Link, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import RedirectButton from "@/Components/RedirectButton.jsx";

export default function PaperCard({ paper, paperStatus, author }){
    return(
        <>
            <Link href={`/papers/${paper.id}`}>
                <div
                    className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50
                    via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl
                    shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01]
                    transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                >
                    <div>
                        {paperStatus === "Pending" ?
                            <span
                                className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        {paperStatus}
                    </span>
                            :
                            <span
                                className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-blue-400">
                        {paperStatus}
                    </span>
                        }

                        <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {paper.title.length > 30
                                ? paper.title.slice(0, 30) + '...'
                                : paper.title}
                        </h2>
                        <p className="mt-1">
                            {paper.abstract.length > 100
                                ? paper.abstract.slice(0, 100) + '...'
                                : paper.abstract}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}
