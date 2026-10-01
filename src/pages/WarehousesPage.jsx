import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Folder, Package } from "lucide-react";
import { warehouseRecords } from "../data/warehouses";
import { formatDateTime } from "../utils/formatDate";
import { NewWarehouseModal } from "../components/warehouse/NewWarehouseModal";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { Input } from "../components/ui/Input";

export function WarehousesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [showDisabled, setShowDisabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const warehouseBasePath = location.pathname.startsWith(
        "/inventory/warehouses",
    )
        ? "/inventory/warehouses"
        : "/warehouses";
    const filteredWarehouses = useMemo(
        () =>
            warehouseRecords.filter(
                (warehouse) =>
                    `${warehouse.code} ${warehouse.name}`
                        .toLowerCase()
                        .includes(query.toLowerCase()) &&
                    (showDisabled || warehouse.status !== "Disabled"),
            ),
        [query, showDisabled],
    );
    const columns = [
        {
            key: "code",
            label: "Code",
            render: (value) => <span className="table-code">{value}</span>,
        },
        { key: "name", label: "Warehouse Name" },
        { key: "company", label: "Company" },
        { key: "branch", label: "Branch" },
        {
            key: "type",
            label: "Type",
            render: (value) => (
                <span className="warehouse-type">
                    <span>
                        {value === "Warehouse Group" ? (
                            <Folder size={16} />
                        ) : (
                            <Package size={16} />
                        )}
                    </span>
                    {value}
                </span>
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
            key: "modified",
            label: "Modified",
            render: (value) => formatDateTime(value),
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Warehouses"
                title="Warehouses"
                subtitle={`${warehouseRecords.length} warehouses for Apex Manufacturing Pvt Ltd`}
                actions={
                    <Button onClick={() => setModalOpen(true)}>
                        + New Warehouse
                    </Button>
                }
            />
            <Card className="filter-bar warehouse-filter-bar">
                <Input
                    label="Search"
                    placeholder="Search by name or code"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <label className="warehouse-checkbox warehouse-list-checkbox">
                    <input
                        type="checkbox"
                        checked={showDisabled}
                        onChange={(event) =>
                            setShowDisabled(event.target.checked)
                        }
                    />
                    <span>Show disabled</span>
                </label>
            </Card>
            <Card className="table-card warehouses-table-card">
                <DataTable
                    columns={columns}
                    data={filteredWarehouses}
                    rowKey="code"
                    onRowClick={(warehouse) =>
                        navigate(
                            `${warehouseBasePath}/${encodeURIComponent(warehouse.code)}`,
                        )
                    }
                    emptyMessage="No warehouses match the current filters."
                />
            </Card>
            <NewWarehouseModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </PageContainer>
    );
}
