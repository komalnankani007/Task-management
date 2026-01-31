import React, { useEffect, useMemo, useRef, useState } from 'react';


function EditTask({ task, onSave, onCancel }) {

    const [title, setTitle] = useState(String(task?.title ?? ''));
    const [description, setDescription] = useState(String(task?.description ?? ''));
    const [status, setStatus] = useState(String(task?.status ?? 'pending'));

    const statusOptions = useMemo(
        () => [
            { value: 'pending', label: 'Pending', dotClass: 'status-dot-pending' },
            { value: 'inprogress', label: 'In Progress', dotClass: 'status-dot-inprogress' },
            { value: 'completed', label: 'Completed', dotClass: 'status-dot-completed' },
        ],
        []
    );

    const selectedStatus = statusOptions.find((o) => o.value === status) ?? statusOptions[0];

    const [statusOpen, setStatusOpen] = useState(false);
    const statusDropdownRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!statusDropdownRef.current) return;
            if (!statusDropdownRef.current.contains(e.target)) {
                setStatusOpen(false);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);
    const handleSave = () => {
        const next = {
            ...task,
            title: title,
            description: description,
            status: status,
        };

        if (typeof onSave === 'function') onSave(next);
    };



    return (
        <div className="edit-task-page">
            <div className="edit-task-card">
                <h2 className="edit-task-title">Edit Task</h2>

                <input
                    type="text"
                    className="add-task-input"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    className="add-task-input"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="add-task-status" ref={statusDropdownRef}>
                    <div className="status-select">
                        <button
                            type="button"
                            className="status-select-trigger"
                            aria-haspopup="listbox"
                            aria-expanded={statusOpen}
                            onClick={() => setStatusOpen((v) => !v)}
                        >
                            <span className={`status-dot ${selectedStatus.dotClass}`} />
                            <span className="status-select-label">{selectedStatus.label}</span>
                            <span className={`status-select-caret ${statusOpen ? 'is-open' : ''}`}>^</span>
                        </button>

                        {statusOpen && (
                            <div className="status-select-menu" role="listbox" aria-label="Status">
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        className={`status-select-option ${opt.value === status ? 'is-selected' : ''}`}
                                        role="option"
                                        aria-selected={opt.value === status}
                                        onClick={() => {
                                            setStatus(opt.value);
                                            setStatusOpen(false);
                                        }}
                                    >
                                        <span className={`status-dot ${opt.dotClass}`} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="add-task-actions">
                    <button type="button" className="add-task-btn" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" className="add-task-btn add-task-btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
