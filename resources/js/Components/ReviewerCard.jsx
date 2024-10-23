import {Head, Link, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import RedirectButton from "@/Components/RedirectButton.jsx";

export default function ReviewerCard({ reviewer }){
    return(
        <>
            <div
                className="pr-2 pt-2 pl-2 bg-white hover:bg-slate-50"
            >
                <div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {reviewer.name}
                    </h2>
                    <p className="mt-1">
                        {reviewer.academicTitle}, {reviewer.affiliation}
                    </p>
                </div>

                <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"/>
            </div>
        </>
    )
}
