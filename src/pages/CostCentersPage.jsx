import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { costCenters as initialCostCenters } from "../data/costCenters";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { CostCenterFormDialog } from "../components/masterData/CostCenterFormDialog";
import { DeleteCostCenterDialog } from "../components/masterData/DeleteCostCenterDialog";

function CostCenterMenu({ costCenter, open, onToggle, onEdit, onDelete }) {
    return (
        <div className="cost-center-menu">
            <button
                type="button"
                className="icon-button cost-center-menu-trigger"
                aria-label={`Open actions for ${costCenter.name}`}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => onToggle(costCenter.id)}
            >
                <MoreHorizontal size={18} />
            </button>
            {open && (
                <div className="cost-center-menu-list" role="menu">
                    <button
                        type="button"
                        className="cost-center-menu-item"
                        role="menuitem"
                        onClick={() => onEdit(costCenter)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="cost-center-menu-item cost-center-menu-item--danger"
                        role="menuitem"
                        onClick={() => onDelete(costCenter)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export function CostCentersPage() {
    const [costCenters, setCostCenters] = useState(initialCostCenters);
    const [query, setQuery] = useState("");
    const [formState, setFormState] = useState({
        open: false,
        mode: "create",
        costCenter: null,
    });
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const filteredCostCenters = useMemo(
        () =>
            costCenters.filter((costCenter) =>
                `${costCenter.id} ${costCenter.name} ${costCenter.parent}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
            ),
        [costCenters, query],
    );
    const parentOptions = [
        { value: "none", label: "—" },
        ...costCenters
            .filter((costCenter) => costCenter.status === "Active")
            .map((costCenter) => ({
                value: costCenter.id,
                label: costCenter.name,
            })),
    ];

    const saveCostCenter = (values) => {
        if (formState.mode === "edit") {
            setCostCenters((current) =>
                current.map((costCenter) =>
                    costCenter.id === formState.costCenter.id
                        ? { ...costCenter, ...values }
                        : costCenter,
                ),
            );
        } else {
            setCostCenters((current) => [
                ...current,
                { id: `${values.name} - APX`, ...values, status: "Active" },
            ]);
        }
        setFormState({ open: false, mode: "create", costCenter: null });
    };

    const columns = [
        {
            key: "id",
            label: "ID",
            render: (value) => <span className="cost-center-id">{value}</span>,
        },
        {
            key: "name",
            label: "Name",
            render: (value, row) => (
                <span
                    className={`cost-center-name ${row.parent !== "—" ? "cost-center-name--child" : ""}`}
                >
                    {value}
                </span>
            ),
        },
        { key: "parent", label: "Parent" },
        { key: "branchCode", label: "Branch Code" },
        {
            key: "auditable",
            label: "Auditable",
            render: (value) => (
                <Badge tone={value ? "success" : "neutral"}>
                    {value ? "Yes" : "No"}
                </Badge>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Badge tone={value === "Active" ? "success" : "neutral"}>
                    {value}
                </Badge>
            ),
        },
        {
            key: "menu",
            label: "",
            render: (_, row) => (
                <CostCenterMenu
                    costCenter={row}
                    open={openMenuId === row.id}
                    onToggle={(id) =>
                        setOpenMenuId((current) => (current === id ? null : id))
                    }
                    onEdit={(costCenter) => {
                        setOpenMenuId(null);
                        setFormState({ open: true, mode: "edit", costCenter });
                    }}
                    onDelete={(costCenter) => {
                        setOpenMenuId(null);
                        setDeleteTarget(costCenter);
                    }}
                />
            ),
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Master Data / Cost Centers"
                title="Cost Centers"
                subtitle={`${costCenters.length} cost centers`}
                actions={
                    <Button
                        onClick={() =>
                            setFormState({
                                open: true,
                                mode: "create",
                                costCenter: null,
                            })
                        }
                    >
                        + New Cost Center
                    </Button>
                }
            />
            <Card className="filter-bar cost-center-filter-bar">
                <Input
                    label="Search"
                    placeholder="ID / name / parent"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </Card>
            <Card className="table-card cost-centers-table-card">
                <DataTable
                    columns={columns}
                    data={filteredCostCenters}
                    rowKey="id"
                    emptyMessage="No cost centers match the current search."
                />
            </Card>
            <CostCenterFormDialog
                key={`${formState.open}-${formState.mode}-${formState.costCenter?.id ?? "new"}`}
                open={formState.open}
                mode={formState.mode}
                costCenter={formState.costCenter}
                parentOptions={parentOptions}
                onClose={() =>
                    setFormState({
                        open: false,
                        mode: "create",
                        costCenter: null,
                    })
                }
                onSave={saveCostCenter}
            />
            <DeleteCostCenterDialog
                open={Boolean(deleteTarget)}
                costCenter={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    setCostCenters((current) =>
                        current.filter(
                            (costCenter) => costCenter.id !== deleteTarget.id,
                        ),
                    );
                    setDeleteTarget(null);
                }}
            />
        </PageContainer>
    );
}
