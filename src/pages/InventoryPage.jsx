import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { audits } from "../data/audits";
import { items } from "../data/items";
import { stockMovementRows } from "../data/stockMovements";
import { Card } from "../components/ui/Card";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function InventoryPage() {
    const navigate = useNavigate();
    const totalItems = items.length;
    const stockActivity = stockMovementRows.length;
    const openAudits = audits.filter((audit) => !["Completed", "Closed"].includes(audit.status)).length;

    return (
        <PageContainer>
            <PageHeader
                title="Inventory"
                subtitle="A quick overview of your inventory and activity."
            />
            <div className="dashboard-grid">
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/items")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Total items</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">{totalItems}</strong>
                    <span className="dashboard-card__support">items</span>
                </Card>
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/inventory/stock-entries/new")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Stock activity</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">{stockActivity}</strong>
                    <span className="dashboard-card__support">entries</span>
                </Card>
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/audits")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Open audits</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">{openAudits}</strong>
                    <span className="dashboard-card__support">audits</span>
                    <span className="dashboard-card__support dashboard-card__support--italic">{openAudits === 0 ? "No audits open right now. You're all caught up!" : "Audits currently open in the prototype."}</span>
                </Card>
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/inventory/stock-entries")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Quick action</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__action">
                        Record Stock Entry
                    </strong>
                </Card>
            </div>
        </PageContainer>
    );
}
