import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <PageHeader
                title="Your account"
                subtitle="A quick overview of your customer account and activity."
            />
            <div className="dashboard-grid">
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/tiers")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Tier</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">T2</strong>
                    <span className="dashboard-card__support">NexPro</span>
                </Card>
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/addons")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Enabled add-ons</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">8</strong>
                    <span className="dashboard-card__support">
                        Inventory Auditing, Asset Auditing, Accounting
                    </span>
                </Card>
                <Card className="dashboard-card">
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Open audits</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__value">0</strong>
                    <span className="dashboard-card__support dashboard-card__support--italic">
                        No audits currently in progress. Your auditor will reach
                        out when one starts.
                    </span>
                </Card>
                <Card
                    className="dashboard-card dashboard-card--clickable"
                    onClick={() => navigate("/items")}
                >
                    <div className="dashboard-card__top">
                        <span className="eyebrow">Quick action</span>
                        <ArrowUpRight size={18} />
                    </div>
                    <strong className="dashboard-card__action">
                        + New Stock Entry
                    </strong>
                </Card>
            </div>
        </PageContainer>
    );
}
