import { ClipboardList } from "lucide-react";
import { Card } from "../components/ui/Card";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function PlaceholderPage({ title, subtitle }) {
    return (
        <PageContainer>
            <PageHeader title={title} subtitle={subtitle} />
            <Card className="empty-placeholder">
                <ClipboardList size={24} />
                <h2>Foundation placeholder</h2>
                <p>This route is reserved for a future prototype slice.</p>
            </Card>
        </PageContainer>
    );
}
