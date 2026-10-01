import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { uoms as initialUoms } from "../data/uoms";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { DisableUomDialog } from "../components/masterData/DisableUomDialog";
import { UomFormDialog } from "../components/masterData/UomFormDialog";

function UomActionsMenu({ uom, onEdit, onDelete }) {
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
        callback(uom);
    };

    return (
        <div className="uom-actions-menu">
            <button
                ref={triggerRef}
                type="button"
                className="icon-button uom-menu-trigger"
                aria-label={`Open actions for ${uom.unitName}`}
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
                        className="uom-menu-list"
                        role="menu"
                        style={{ top: position.top, left: position.left }}
                    >
                        <button
                            type="button"
                            className="uom-menu-item"
                            role="menuitem"
                            onClick={() => closeAnd(onEdit)}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="uom-menu-item uom-menu-item--danger"
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

export function UomsPage() {
    const [uoms, setUoms] = useState(initialUoms);
    const [query, setQuery] = useState("");
    const [formState, setFormState] = useState({
        open: false,
        mode: "create",
        uom: null,
    });
    const [disableTarget, setDisableTarget] = useState(null);
    const filteredUoms = useMemo(
        () =>
            uoms.filter((uom) =>
                `${uom.id} ${uom.unitName} ${uom.commonCode}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
            ),
        [uoms, query],
    );

    const saveUom = (values) => {
        if (formState.mode === "edit") {
            setUoms((current) =>
                current.map((uom) =>
                    uom.id === formState.uom.id
                        ? { ...uom, unitName: values.name, ...values }
                        : uom,
                ),
            );
        } else {
            setUoms((current) => [
                ...current,
                {
                    id: values.name,
                    unitName: values.name,
                    ...values,
                    status: "Active",
                },
            ]);
        }
        setFormState({ open: false, mode: "create", uom: null });
    };

    const columns = [
        {
            key: "id",
            label: "Name",
            render: (value) => <span className="uom-id">{value}</span>,
        },
        {
            key: "unitName",
            label: "Unit Name",
            render: (value) => <span className="uom-name">{value}</span>,
        },
        { key: "symbol", label: "Symbol" },
        { key: "commonCode", label: "Common Code" },
        {
            key: "wholeNumber",
            label: "Whole Number",
            render: (value) => (
                <Badge tone={value ? "success" : "neutral"}>
                    {value ? "Yes" : "No"}
                </Badge>
            ),
        },
        { key: "category", label: "Category" },
        {
            key: "actions",
            label: "",
            render: (_, row) => (
                <UomActionsMenu
                    uom={row}
                    onEdit={(uom) =>
                        setFormState({ open: true, mode: "edit", uom })
                    }
                    onDelete={(uom) => setDisableTarget(uom)}
                />
            ),
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Master Data / UoM"
                title="Units of Measure"
                subtitle={`${uoms.length} units`}
                actions={
                    <Button
                        onClick={() =>
                            setFormState({
                                open: true,
                                mode: "create",
                                uom: null,
                            })
                        }
                    >
                        + New Unit
                    </Button>
                }
            />
            <Card className="filter-bar uom-filter-bar">
                <Input
                    label="Search"
                    placeholder="Name / UoM / common code"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </Card>
            <Card className="table-card uoms-table-card">
                <DataTable
                    columns={columns}
                    data={filteredUoms}
                    rowKey="id"
                    emptyMessage="No units match the current search."
                />
            </Card>
            <UomFormDialog
                key={`${formState.open}-${formState.mode}-${formState.uom?.id ?? "new"}`}
                open={formState.open}
                mode={formState.mode}
                uom={formState.uom}
                onClose={() =>
                    setFormState({ open: false, mode: "create", uom: null })
                }
                onSave={saveUom}
            />
            <DisableUomDialog
                open={Boolean(disableTarget)}
                uom={disableTarget}
                onClose={() => setDisableTarget(null)}
                onConfirm={() => {
                    setUoms((current) =>
                        current.map((uom) =>
                            uom.id === disableTarget.id
                                ? { ...uom, status: "Disabled" }
                                : uom,
                        ),
                    );
                    setDisableTarget(null);
                }}
            />
        </PageContainer>
    );
}
