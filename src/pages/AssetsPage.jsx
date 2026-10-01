import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../data/assets";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Input } from "../components/ui/Input";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";

export function AssetsPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const categories = [...new Set(assets.map((asset) => asset.category))];
    const filteredAssets = useMemo(
        () =>
            assets.filter(
                (asset) =>
                    asset.name.toLowerCase().includes(query.toLowerCase()) &&
                    (category === "all" || asset.category === category) &&
                    (status === "all" || asset.status === status),
            ),
        [category, query, status],
    );
    const columns = [
        {
            key: "name",
            label: "Asset",
            render: (value) => <span className="table-code">{value}</span>,
        },
        { key: "category", label: "Category" },
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Badge tone={value === "Draft" ? "neutral" : "success"}>
                    {value}
                </Badge>
            ),
        },
        { key: "location", label: "Location" },
        { key: "custodian", label: "Custodian" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Assets"
                title="Assets"
                subtitle="296 assets for Apex Manufacturing Pvt Ltd"
                actions={<Button>Create Asset</Button>}
            />
            <Card className="filter-bar asset-filter-bar">
                <Input
                    label="Search"
                    placeholder="Search by asset name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Select
                    label="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    options={[
                        { value: "all", label: "All categories" },
                        ...categories.map((value) => ({ value, label: value })),
                    ]}
                />
                <Select
                    label="Status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    options={[
                        { value: "all", label: "All statuses" },
                        { value: "Submitted", label: "Submitted" },
                        { value: "Draft", label: "Draft" },
                    ]}
                />
            </Card>
            <Card className="table-card assets-table-card">
                <DataTable
                    columns={columns}
                    data={filteredAssets}
                    rowKey="name"
                    onRowClick={(asset) =>
                        navigate(`/assets/${encodeURIComponent(asset.name)}`)
                    }
                    emptyMessage="No assets match the current filters."
                />
            </Card>
        </PageContainer>
    );
}
