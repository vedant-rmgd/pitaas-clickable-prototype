import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";
import { StockCorrectionModal } from "../components/stock/StockCorrectionModal";
import { stockCorrectionRows } from "../data/stockCorrections";

export function StockCorrectionsPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const columns = [
        {
            key: "name",
            label: "Name",
            render: (value) => <span className="table-code">{value}</span>,
        },
        { key: "purpose", label: "Purpose" },
        { key: "postingDate", label: "Posting Date" },
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Badge
                    tone={
                        value === "Submitted"
                            ? "success"
                            : value === "Draft"
                              ? "neutral"
                              : "error"
                    }
                >
                    {value}
                </Badge>
            ),
        },
        { key: "items", label: "Items" },
        { key: "quantityDifference", label: "Quantity Difference" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Inventory / Stock Corrections"
                title="Stock Corrections"
                subtitle="48 stock corrections for Apex Manufacturing Pvt Ltd"
                actions={
                    <Button onClick={() => setDialogOpen(true)}>
                        <Plus size={16} aria-hidden="true" />
                        Record Stock Correction
                    </Button>
                }
            />
            <Card className="filter-bar stock-correction-filter-bar">
                <Select
                    label="Purpose"
                    options={[
                        { value: "all", label: "All purposes" },
                        {
                            value: "cycle-count",
                            label: "Cycle Count Correction",
                        },
                        { value: "damage", label: "Damage Write-Off" },
                        { value: "found", label: "Found Stock" },
                    ]}
                />
                <Select
                    label="Status"
                    options={[
                        { value: "all", label: "All statuses" },
                        { value: "draft", label: "Draft" },
                        { value: "submitted", label: "Submitted" },
                        { value: "cancelled", label: "Cancelled" },
                    ]}
                />
                <Input label="From" type="date" />
                <Input label="To" type="date" />
            </Card>
            <Card className="table-card stock-corrections-table-card">
                <DataTable
                    columns={columns}
                    data={stockCorrectionRows}
                    rowKey="name"
                />
            </Card>
            <StockCorrectionModal
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </PageContainer>
    );
}
