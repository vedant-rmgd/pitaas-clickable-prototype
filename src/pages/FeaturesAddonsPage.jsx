import { features } from "../data/features";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function FeaturesAddonsPage() {
    const columns = [
        {
            key: "code",
            label: "Code",
            render: (value) => <span className="feature-code">{value}</span>,
        },
        { key: "name", label: "Name" },
        { key: "group", label: "Group" },
        {
            key: "included",
            label: "Included in plan",
            render: (value) => (
                <Badge tone={value === "Yes" ? "success" : "neutral"}>
                    {value}
                </Badge>
            ),
        },
        {
            key: "optional",
            label: "Add-on",
            render: (value) => (
                <Badge tone={value === "Yes" ? "success" : "neutral"}>
                    {value}
                </Badge>
            ),
        },
        {
            key: "enabled",
            label: "Enabled",
            render: (value) => <Badge tone="success">{value}</Badge>,
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Features & Add-ons"
                title="Features & Add-ons"
                subtitle="8 features available for your plan"
            />
            <div className="features-section-stack">
                <Card className="features-read-only">
                    This page shows which features are included and enabled for
                    your plan. Changes are managed by your PiTaaS administrator.
                </Card>
                <Card className="table-card features-table-card">
                    <DataTable
                        columns={columns}
                        data={features}
                        rowKey="code"
                    />
                </Card>
            </div>
        </PageContainer>
    );
}
