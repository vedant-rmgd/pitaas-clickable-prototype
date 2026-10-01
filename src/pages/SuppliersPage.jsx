import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { suppliers as initialSuppliers } from "../data/suppliers";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { DisableSupplierDialog } from "../components/masterData/DisableSupplierDialog";
import { SupplierFormDialog } from "../components/masterData/SupplierFormDialog";

function SupplierActionsMenu({ supplier, onEdit, onDelete }) {
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
                <MoreHorizontal size={18} />
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
                        <button
                            type="button"
                            className="supplier-menu-item supplier-menu-item--danger"
                            role="menuitem"
                            onClick={() => closeAnd(onDelete)}
                        >
                            Delete
                        </button>
                    </div>,
                    document.body,
                )}
        </div>
    );
}

export function SuppliersPage() {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [query, setQuery] = useState("");
    const [formState, setFormState] = useState({
        open: false,
        mode: "create",
        supplier: null,
    });
    const [disableTarget, setDisableTarget] = useState(null);
    const filteredSuppliers = useMemo(
        () =>
            suppliers.filter((supplier) =>
                `${supplier.id} ${supplier.name} ${supplier.taxId} ${supplier.country}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
            ),
        [suppliers, query],
    );

    const saveSupplier = (values) => {
        if (formState.mode === "edit") {
            setSuppliers((current) =>
                current.map((supplier) =>
                    supplier.id === formState.supplier.id
                        ? { ...supplier, ...values }
                        : supplier,
                ),
            );
        } else {
            setSuppliers((current) => [
                ...current,
                {
                    id: `${values.name} - NEW`,
                    ...values,
                    country: values.country || "—",
                    taxId: values.taxId || "—",
                    status: "Active",
                },
            ]);
        }
        setFormState({ open: false, mode: "create", supplier: null });
    };

    const columns = [
        {
            key: "id",
            label: "ID",
            render: (value) => <span className="supplier-id">{value}</span>,
        },
        {
            key: "name",
            label: "Name",
            render: (value) => <span className="supplier-name">{value}</span>,
        },
        {
            key: "type",
            label: "Type",
            render: (value) => <Badge tone="info">{value}</Badge>,
        },
        { key: "group", label: "Group" },
        { key: "country", label: "Country" },
        {
            key: "taxId",
            label: "Tax ID",
            render: (value) => (
                <span className="supplier-tax-id" title={value}>
                    {value}
                </span>
            ),
        },
        {
            key: "actions",
            label: "",
            render: (_, row) => (
                <SupplierActionsMenu
                    supplier={row}
                    onEdit={(supplier) =>
                        setFormState({ open: true, mode: "edit", supplier })
                    }
                    onDelete={(supplier) => setDisableTarget(supplier)}
                />
            ),
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Master Data / Suppliers"
                title="Suppliers"
                subtitle={`${suppliers.length} suppliers`}
                actions={
                    <Button
                        onClick={() =>
                            setFormState({
                                open: true,
                                mode: "create",
                                supplier: null,
                            })
                        }
                    >
                        + New Supplier
                    </Button>
                }
            />
            <Card className="filter-bar supplier-filter-bar">
                <Input
                    label="Search"
                    placeholder="ID / name / tax ID / country"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </Card>
            <Card className="table-card suppliers-table-card">
                <DataTable
                    columns={columns}
                    data={filteredSuppliers}
                    rowKey="id"
                    emptyMessage="No suppliers match the current search."
                />
            </Card>
            <SupplierFormDialog
                key={`${formState.open}-${formState.mode}-${formState.supplier?.id ?? "new"}`}
                open={formState.open}
                mode={formState.mode}
                supplier={formState.supplier}
                onClose={() =>
                    setFormState({
                        open: false,
                        mode: "create",
                        supplier: null,
                    })
                }
                onSave={saveSupplier}
            />
            <DisableSupplierDialog
                open={Boolean(disableTarget)}
                supplier={disableTarget}
                onClose={() => setDisableTarget(null)}
                onConfirm={() => {
                    setSuppliers((current) =>
                        current.map((supplier) =>
                            supplier.id === disableTarget.id
                                ? { ...supplier, status: "Disabled" }
                                : supplier,
                        ),
                    );
                    setDisableTarget(null);
                }}
            />
        </PageContainer>
    );
}
