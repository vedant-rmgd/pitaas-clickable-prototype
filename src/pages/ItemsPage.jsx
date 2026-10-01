import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { items } from "../data/items";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Dialog } from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";

const itemListRows = items.slice(0, 3).map((item, index) => {
    const listValues = [
        { code: "CAP", name: "Cap" },
        { code: "SLEEVE", name: "Sleeve" },
        { code: "PALLET", name: "Pallet" },
    ][index];

    return {
        ...item,
        ...listValues,
        detailCode: item.code,
    };
});

export function ItemsPage() {
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("all");
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const filteredItems = itemListRows.filter(
        (item) =>
            `${item.code} ${item.name}`
                .toLowerCase()
                .includes(query.toLowerCase()) &&
            (group === "all" || item.group.toLowerCase() === group),
    );
    const columns = [
        {
            key: "code",
            label: "Item Code",
            render: (value) => <span className="table-code">{value}</span>,
        },
        { key: "name", label: "Name" },
        { key: "group", label: "Group" },
        { key: "unit", label: "Unit" },
        { key: "stockItem", label: "Stock Item" },
        { key: "fixedAsset", label: "Fixed Asset" },
        { key: "pitassId", label: "PITaaS ID" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Inventory / Items"
                title="Items"
                subtitle="Catalog and type records for reusable packaging parts."
                actions={
                    <Button onClick={() => setDialogOpen(true)}>
                        <Plus size={16} aria-hidden="true" />
                        Add item
                    </Button>
                }
            />
            <Card className="filter-bar">
                <Input
                    label="Search items"
                    placeholder="Search by code or name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Select
                    label="Item group"
                    value={group}
                    onChange={(event) => setGroup(event.target.value)}
                    options={[
                        { value: "all", label: "All groups" },
                        { value: "cap", label: "Cap" },
                        { value: "sleeve", label: "Sleeve" },
                        { value: "pallet", label: "Pallet" },
                    ]}
                />
                <Button
                    variant="secondary"
                    className="filter-bar__button"
                    onClick={() => {
                        setQuery("");
                        setGroup("all");
                    }}
                >
                    Clear filters
                </Button>
            </Card>
            <Card className="table-card">
                <div className="table-card__header">
                    <div>
                        <h2>Item catalog</h2>
                        <p>{filteredItems.length} item types</p>
                    </div>
                    <Badge tone="info">Static demo</Badge>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    rowKey="code"
                    onRowClick={(item) => navigate(`/items/${item.detailCode}`)}
                    emptyMessage="No item types match the current filters."
                />
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title="Add item"
                description="This prototype action is intentionally not connected to a backend."
            >
                <div className="dialog-placeholder">
                    <Package size={22} />
                    <span>
                        Item creation will be added in a later feature slice.
                    </span>
                </div>
            </Dialog>
        </PageContainer>
    );
}
