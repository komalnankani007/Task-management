import React, { useState } from 'react';

function AddTask({ onAdd, onCancel }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    const handleAdd = () => {
        const task = {
            title: title.trim(),
            description: description.trim(),
            status,
        };

        if (typeof onAdd === 'function') {
            onAdd(task);
        }

        setTitle('');
        setDescription('');
        setStatus('pending');
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');

        if (typeof onCancel === 'function') {
            onCancel();
        }
    };

    return (

        <>



            <input
                type="text"
                placeholder="Enter title"
                className="add-task-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <input
                type="text"
                placeholder="Enter description"
                className="add-task-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />



            <br />
            <label className="add-task-status">
                <select className="add-task-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>

            <br />
            <div className="add-task-actions">

                <button type="button" className="add-task-btn add-task-btn-secondary" onClick={handleCancel}>Cancel</button>
                <button type="button" className="add-task-btn" onClick={() => { handleAdd() }}>ADD</button>
            </div>

        </>
    );

}

export default AddTask; 