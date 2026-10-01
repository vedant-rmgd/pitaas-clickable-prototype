import { useLocation, useNavigate, useParams } from "react-router-dom";
import { audits } from "../data/audits";
import { formatDate, formatDateTime } from "../utils/formatDate";
import { AuditEmptySection } from "../components/audit/AuditEmptySection";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function AuditDetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const audit =
        audits.find((entry) => entry.id === decodeURIComponent(id ?? "")) ??
        audits[0];
    const auditBasePath = location.pathname.startsWith("/inventory/audits")
        ? "/inventory/audits"
        : "/audits";
    const metrics = [
        { label: "Items Total", value: audit.itemsTotal },
        { label: "Items Scanned", value: audit.itemsScanned },
        { label: "Items Remaining", value: audit.itemsRemaining },
        {
            label: "Variance Total",
            value: audit.varianceTotal,
            helper: "Difference between expected and counted quantity",
        },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb={`Home / Audits / ${audit.id}`}
                title={`Audit Round ${audit.id}`}
                subtitle={`${audit.status} · ${audit.branch} · ${formatDate(audit.auditDate)}`}
                actions={
                    <Button
                        variant="secondary"
                        onClick={() => navigate(auditBasePath)}
                    >
                        Back to Audits
                    </Button>
                }
            />
            <div className="audit-section-stack">
                <div className="audit-kpi-grid">
                    {metrics.map((metric) => (
                        <Card className="audit-kpi-card" key={metric.label}>
                            <span className="eyebrow">{metric.label}</span>
                            <strong>{metric.value}</strong>
                            {metric.helper && (
                                <span className="audit-kpi-helper">
                                    {metric.helper}
                                </span>
                            )}
                        </Card>
                    ))}
                </div>
                <Card className="audit-section-card">
                    <div className="audit-section-header">
                        <h2>Round details</h2>
                    </div>
                    <dl className="audit-fields">
                        <div>
                            <dt>Status</dt>
                            <dd>
                                <Badge tone="neutral">{audit.status}</Badge>
                            </dd>
                        </div>
                        <div>
                            <dt>Audit Type</dt>
                            <dd>{audit.auditType}</dd>
                        </div>
                        <div>
                            <dt>Auditor</dt>
                            <dd>{audit.auditor}</dd>
                        </div>
                        <div>
                            <dt>Policy</dt>
                            <dd>{audit.policy}</dd>
                        </div>
                        <div>
                            <dt>Created By</dt>
                            <dd>{audit.createdBy}</dd>
                        </div>
                        <div>
                            <dt>Last Modified</dt>
                            <dd>
                                {formatDateTime(audit.lastModifiedAt)} ·{" "}
                                {audit.createdBy}
                            </dd>
                        </div>
                    </dl>
                </Card>
                <AuditEmptySection
                    title="Inventory items"
                    helper="Items will appear here when they are added to the audit round."
                />
                <AuditEmptySection
                    title="Scan results"
                    helper="Scan results will appear here as auditors record them during this audit."
                />
            </div>
        </PageContainer>
    );
}
