import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/Badge";
import { DataTable } from "../ui/DataTable";

function SupplierActionsMenu({ supplier, onEdit, onDisable, onEnable }) {
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(null);

    useLayoutEffect(() => {
        if (!open) return undefined;
        const updatePosition = () => {
            const rect = triggerRef.current?.getBoundingClientRect();
            if (rect)
                setPosition({
                    top: rect.bottom + 4,
                    left: Math.max(8, rect.right - 112),
                });
        };
        const closeOnOutsideClick = (event) => {
            if (
                !triggerRef.current?.contains(event.target) &&
                !menuRef.current?.contains(event.target)
            )
                setOpen(false);
        };
        updatePosition();
        document.addEventListener("mousedown", closeOnOutsideClick);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [open]);

    const closeAnd = (callback) => {
        setOpen(false);
        callback(supplier);
    };

    return (
        <div className="supplier-actions-menu">
            <button
                ref={triggerRef}
                type="button"
                className="icon-button supplier-menu-trigger"
                aria-label={`Open actions for ${supplier.name}`}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
            >
                <MoreHorizontal size={18} aria-hidden="true" />
            </button>
            {open &&
                position &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="supplier-menu-list"
                        role="menu"
                        style={{ top: position.top, left: position.left }}
                    >
                        <button
                            type="button"
                            className="supplier-menu-item"
                            role="menuitem"
                            onClick={() => closeAnd(onEdit)}
                        >
                            Edit
                        </button>
                        {supplier.status === "Active" ? (
                            <button
                                type="button"
                                className="supplier-menu-item supplier-menu-item--danger"
                                role="menuitem"
                                onClick={() => closeAnd(onDisable)}
                            >
                                Disable
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="supplier-menu-item"
                                role="menuitem"
                                onClick={() => closeAnd(onEnable)}
                            >
                                Enable
                            </button>
                        )}
                    </div>,
                    document.body,
                )}
        </div>
    );
}

function displayValue(value) {
    return value || "—";
}

export function SuppliersTable({ suppliers, onEdit, onDisable, onEnable, emptyMessage = 'No suppliers found.' }) {
    const columns = [
        {
            key: "name",
            label: "Supplier Name",
            className: "w-[26%]",
            render: (value) => <span className="supplier-name">{value}</span>,
        },
        {
            key: "country",
            label: "Location",
            className: "w-[14%]",
            render: (value) => displayValue(value),
        },
        {
            key: "email",
            label: "Email",
            className: "w-[24%]",
            render: (value) => (
                <span
                    className="block whitespace-normal break-all"
                    title={value}
                >
                    {displayValue(value)}
                </span>
            ),
        },
        {
            key: "mobile",
            label: "Mobile",
            className: "w-[16%]",
            render: (value) => displayValue(value),
        },
        {
            key: "status",
            label: "Status",
            className: "w-[10%]",
            render: (value) => (
                <Badge tone={value === "Active" ? "success" : "neutral"}>
                    {value}
                </Badge>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            className: "w-[10%] !px-2",
            render: (_, row) => (
                <SupplierActionsMenu
                    supplier={row}
                    onEdit={onEdit}
                    onDisable={onDisable}
                    onEnable={onEnable}
                />
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={suppliers}
            rowKey="id"
            wrapClassName="!overflow-x-hidden min-h-[30rem] max-h-[33rem] overflow-y-auto"
            tableClassName="table-fixed w-full max-w-full"
            stickyHeader
            emptyMessage={emptyMessage}
        />
    );
}
