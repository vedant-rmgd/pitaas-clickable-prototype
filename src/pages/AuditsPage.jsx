import { useLocation, useNavigate } from "react-router-dom";
import { audits } from "../data/audits";
import { formatDate, formatDateTime } from "../utils/formatDate";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function AuditsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const auditBasePath = location.pathname.startsWith("/inventory/audits")
        ? "/inventory/audits"
        : "/audits";
    const columns = [
        {
            key: "id",
            label: "Audit Round ID",
            render: (value) => <span className="table-code">{value}</span>,
        },
        {
            key: "status",
            label: "Policy / Status",
            render: (value) => <Badge tone="neutral">{value}</Badge>,
        },
        {
            key: "startedAt",
            label: "Started / Last Updated",
            render: (value, row) => (
                <div className="audit-date-range">
                    <span>{formatDate(value)}</span>
                    <span>→</span>
                    <span>{formatDateTime(row.lastUpdatedAt)}</span>
                </div>
            ),
        },
        { key: "auditor", label: "Auditor" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Audits"
                title="Audits"
                subtitle="Open and past audit rounds for your account"
            />
            <Card className="table-card audits-table-card">
                <DataTable
                    columns={columns}
                    data={audits}
                    rowKey="id"
                    onRowClick={(audit) =>
                        navigate(
                            `${auditBasePath}/${encodeURIComponent(audit.id)}`,
                        )
                    }
                />
            </Card>
        </PageContainer>
    );
}
