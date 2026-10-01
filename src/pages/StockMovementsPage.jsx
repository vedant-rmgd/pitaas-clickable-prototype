import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { stockMovementRows } from "../data/stockMovements";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StockMovementsPage() {
    const navigate = useNavigate();
    const columns = [
        { key: "name", label: "Name" },
        { key: "type", label: "Type" },
        { key: "postingDate", label: "Posting Date" },
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Badge tone={value === "Submitted" ? "success" : "neutral"}>
                    {value}
                </Badge>
            ),
        },
        { key: "incoming", label: "Incoming" },
        { key: "outgoing", label: "Outgoing" },
        { key: "flow", label: "Flow" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Inventory / Stock Movements"
                title="Stock Movements"
                subtitle="43 movement records for Apex Manufacturing Pvt Ltd"
                actions={<Button onClick={() => navigate("/inventory/stock-entries/new")}><Plus size={16} aria-hidden="true" />Record Stock Movement</Button>}
            />
            <Card className="filter-bar stock-filter-bar">
                <Input label="Search" placeholder="Search by name" />
                <Select
                    label="Type"
                    options={[
                        { value: "all", label: "All types" },
                        { value: "transfer", label: "Material Transfer" },
                        { value: "receipt", label: "Material Receipt" },
                        { value: "issue", label: "Material Issue" },
                    ]}
                />
                <Select
                    label="Status"
                    options={[
                        { value: "all", label: "All statuses" },
                        { value: "draft", label: "Draft" },
                        { value: "submitted", label: "Submitted" },
                        { value: "canceled", label: "Canceled" },
                    ]}
                />
                <Input label="Warehouse" placeholder="e.g. Apex-BLR" />
                <Input label="From" type="date" />
                <Input label="To" type="date" />
            </Card>
            <Card className="table-card stock-movements-table-card">
                <DataTable
                    columns={columns}
                    data={stockMovementRows}
                    rowKey="name"
                />
            </Card>
        </PageContainer>
    );
}
