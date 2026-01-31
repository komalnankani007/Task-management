import React from "react";


function DisplayTask({ tasks = [], searchText = "", onEdit, onDelete }) {

    const search = String(searchText ?? "").trim().toLowerCase();
    const isSearching = search.length > 0;

    const matchesSearch = (task) => {
        if (!isSearching) return true;

        const haystack = [task?.title, task?.description, task?.status]
            .map((v) => String(v ?? "").toLowerCase())
            .join(" ");

        return haystack.includes(search);
    };

    const statuses = [
        { value: "pending", label: "Pending" },
        { value: "inprogress", label: "In Progress" },
        { value: "completed", label: "Completed" },
    ];

    const groupedAll = {
        pending: [],
        inprogress: [],
        completed: [],
    };

    const groupedFiltered = {
        pending: [],
        inprogress: [],
        completed: [],
    };

    tasks.forEach((t) => {
        const statusKey = t?.status;
        if (!groupedAll[statusKey]) return;

        groupedAll[statusKey].push(t);
        if (matchesSearch(t)) groupedFiltered[statusKey].push(t);
    });

    const totalMatches = statuses.reduce((sum, { value }) => sum + groupedFiltered[value].length, 0);



    return (
        <div className="task-accordion">
            {isSearching && totalMatches === 0 && (
                <div className="task-empty">No matching tasks</div>
            )}
            {statuses.map(({ value, label }) => (
                <details
                    key={value}
                    className="task-group"
                    open={isSearching ? groupedFiltered[value].length > 0 : undefined}
                >
                    <summary className="task-summary">
                        {label} ({isSearching ? groupedFiltered[value].length : groupedAll[value].length})
                    </summary>

                    <div className="task-group-body">
                        {(isSearching ? groupedFiltered[value] : groupedAll[value]).map((item) => (
                            <div key={item.id} className="task-item">
                                <div className="task-item-header">
                                    <h3>{item.title}</h3>
                                    <div className="task-item-actions">
                                        <button
                                            type="button"
                                            className="task-icon-btn"
                                            aria-label="Edit task"
                                            onClick={() => {
                                                if (typeof onEdit === 'function') onEdit(item);
                                            }}
                                        >
                                            ✏
                                        </button>
                                        <button
                                            type="button"
                                            className="task-icon-btn task-icon-btn-danger"
                                            aria-label="Delete task"
                                            onClick={() => {
                                                if (typeof onDelete === 'function') onDelete(item);
                                            }}
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </details>
            ))}
        </div>
    );
}

export default DisplayTask;