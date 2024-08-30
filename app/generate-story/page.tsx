'use client'

import { useEffect, useState } from 'react';

export default function GenerateStory() {
    const [options, setOptions] = useState<{
        conflict: string[];
        pointOfView: string[];
        setting: string[];
    } | null>(null);
    const [facetsFormData, setFacetsFormData] = useState({
        conflict: '',
        pointOfView: '',
        setting: '',
    });
    const [generatedStory, setGeneratedStory] = useState<string | null>(null);
    const [facetsFormSubmitContent, setFacetsFormSubmitContent] = useState<string | null>("Please wait...");
    const [facetsFormSubmitDisabled, setFacetsFormSubmitDisabled] = useState<boolean>(true);

    // Fetch facet data
    useEffect(() => {
        fetch('/api/facets')
        .then((res) => res.json())
        .then((data) => {
            setOptions(data);
            setFacetsFormSubmitContent("Generate!");
            setFacetsFormSubmitDisabled(false);
        })
    }, []);

    // Handle form change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFacetsFormData({
            ...facetsFormData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setFacetsFormSubmitContent("Generating...");
        setFacetsFormSubmitDisabled(true);

        fetch('/api/story-generation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(facetsFormData),
        })
            .then((res) => res.json())
            .then((data) => {
                setGeneratedStory(data.message)
                setFacetsFormSubmitContent("Generate!");
                setFacetsFormSubmitDisabled(false);
            });
    };

    return (
        <main>
            <h2>Select facets to generate a story</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Conflict: 
                    <select name="conflict" value={facetsFormData.conflict} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options?.conflict.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>

                <div>
                    <label>
                    Point of View:
                    <select name="pointOfView" value={facetsFormData.pointOfView} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options?.pointOfView.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>

                <div>
                    <label>
                    Setting:
                    <select name="setting" value={facetsFormData.setting} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options?.setting.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>

                <button type="submit" disabled={facetsFormSubmitDisabled} id="facetsFormSubmit">{facetsFormSubmitContent}</button>
            </form>

            {generatedStory && (
                <p style={{"maxWidth": "500px"}}>{generatedStory}</p>
            )}
        </main>
    );
}