import { useState } from "react";
import { api } from "../lib/api";

export default function ImageUpload({ onUpload, className = "" }) {
    const [uploading, setUploading] = useState(false);

    async function handleChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post("/api/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // The backend returns { url: "/uploads/..." }
            // We pass this relative URL back
            onUpload(res.data.url);
        } catch (err) {
            console.error(err);
            alert("Falha no upload da imagem");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = "";
        }
    }

    return (
        <div className={`relative inline-block ${className}`}>
            <label className={`cursor-pointer inline-flex items-center justify-center h-10 w-10 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors ${uploading ? "animate-pulse" : ""}`}>
                {uploading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleChange} disabled={uploading} />
            </label>
        </div>
    );
}
