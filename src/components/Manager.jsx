import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App';

const Manager = () => {
    const [form, setForm] = useState({ url: "", username: "", password: "" });
    const [savedForms, setSavedForms] = useState([]);
    const eyeRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch("http://localhost:3000/");
                const data = await response.json();
                setSavedForms(data || []);
            } catch (error) {
                console.error("Failed to fetch forms:", error);
            }
        };
        fetchForms();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (form.password.trim() && form.username.trim()) {
            try {
                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                setSavedForms([...savedForms, form]);
                toast.success('🦄 Password saved successfully', { theme: "dark" });
                setForm({ url: "", username: "", password: "" });
            } catch (error) {
                console.error("Failed to save in the database", error);
            }
        }
    };

    const handleEdit = async (index) => {
        const selectedForm = savedForms[index];
        setForm(selectedForm);
        const updatedForms = savedForms.filter((_, i) => i !== index);
        setSavedForms(updatedForms);

        if (window.confirm("Do you really want to edit this password?")) {
            try {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedForm),
                });
            } catch (error) {
                console.error("Unable to edit data:", error);
            }
        }
    };

    const handleDelete = async (index) => {
        const selectedForm = savedForms[index];
        const updatedForms = savedForms.filter((_, i) => i !== index);
        
        if (window.confirm("Do you really want to delete this password?")) {
            setSavedForms(updatedForms);
            try {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedForm),
                });
                toast.success('🦄 Deleted successfully', { theme: "dark" });
            } catch (error) {
                console.error("Unable to delete data:", error);
            }
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('🦄 Text copied successfully', { theme: "dark" });
    };

    const handleTogglePasswordVisibility = () => {
        if (passRef.current.type === "password") {
            eyeRef.current.src = "/src/assets/eye2.png";
            passRef.current.type = "text";
        } else {
            eyeRef.current.src = "/src/assets/eye3.png";
            passRef.current.type = "password";
        }
    };

    return (
        <>
            <ToastContainer autoClose={5000} position="top-right" theme="dark" />
            <div className="w-full p-2 flex justify-center m-4 max-sm:ml-0 max-sm:mr-0">
                <div className="w-1/2 max-sm:w-full flex flex-col gap-3 justify-center max-sm:text-xs">
                    <div className="hover:cursor-pointer font-bold text-2xl max-[425px]:text-lg text-center">
                        <span className="text-green-500">&lt;</span><span>Pass</span><span className="text-green-500">Mangr/&gt;</span>
                        <div className="font-normal max-[425px]:text-[15px]">The Password Manager</div>
                    </div>
                    <input
                        type="text"
                        value={form.url}
                        onChange={handleChange}
                        name="url"
                        className="w-full rounded-md p-[2px] border-[1.5px] border-green-600"
                        placeholder="Enter the website URL"
                    />
                    <div className="w-full flex gap-2 justify-between">
                        <input
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            className="w-1/2 rounded-md p-[2px] border-[1.5px] border-green-600"
                            placeholder="Enter the Username"
                        />
                        <input
                            ref={passRef}
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            className="w-1/2 rounded-md p-[2px] border-[1.5px] border-green-600"
                            placeholder="Enter the Password"
                        />
                        <img
                            ref={eyeRef}
                            onClick={handleTogglePasswordVisibility}
                            className="w-[35px] absolute right-[24.5%] m-[2px] max-sm:right-1 max-sm:mb-1 cursor-pointer max-sm:w-[28px]"
                            src="../src/assets/eye3.png"
                            alt="eye"
                        />
                    </div>
                    <button onClick={handleSubmit} className="p-4 pt-1 pb-1 rounded-md bg-green-400 font-semibold hover:bg-green-500">
                        Save
                    </button>
                    {savedForms.length === 0 ? (
                        <div className="text-center text-lg font-semibold text-gray-600">No Passwords Data is available</div>
                    ) : (
                        <div className="h-[35vh] overflow-y-auto max-sm:h-[50vh]">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-auto">
                                <thead>
                                    <tr className="bg-green-400 text-gray-700 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 max-sm:px-1 max-sm:text-xs text-left border-b">Website Url</th>
                                        <th className="py-3 px-6 max-sm:px-1 max-sm:text-xs text-left border-b">Username</th>
                                        <th className="py-3 px-6 max-sm:px-1 max-sm:text-xs text-left border-b">Password</th>
                                        <th className="py-3 px-6 max-sm:px-1 max-sm:text-xs text-center border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-mono font-semibold overflow-auto">
                                    {savedForms.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">
                                                <a href={`https://www.${item.url}`} target="_blank" rel="noopener noreferrer">
                                                    {item.url}
                                                </a>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {item.username}
                                                <span><svg className='w-4 cursor-pointer inline-flex justify-center gap-1 m-1' onClick={() => handleCopy(item.username)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg></span>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {item.password}
                                                <span><svg className='w-4 cursor-pointer inline-flex justify-center gap-1 m-1' onClick={() => handleCopy(item.username)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg></span>
                                            </td>
                                            <td className="py-3 px-6 text-center inline-flex justify-center gap-1">
                                            <svg className='w-4 cursor-pointer' onClick={() => handleEdit(index)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>|
                                            <svg className='w-[13px] cursor-pointer' onClick={() => handleDelete(index)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
