"use client"

import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

export default function Page() {
    const [code, setCode] = useState(
        ``
    );

    return (
        <main>
            <div className="border-b [border-color:var(--border-light)] dark:border-input pb-6"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium text-medium">Configurations</h2>
                </div>

                <CodeEditor
                    value={code}
                    language="yaml"
                    placeholder="Please paste your Echidna config here."
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        backgroundColor: "var(--background)",
                        fontFamily: "var(--font-mono)",
                        border: "solid var(--border)",
                        borderRadius: "var(--radius)"
                    }}
                />

                <div className="flex items-center justify-between">
                    <h2 className="font-medium text-medium">Collaborators</h2>
                </div>
            </div>
        </main>
    );
}