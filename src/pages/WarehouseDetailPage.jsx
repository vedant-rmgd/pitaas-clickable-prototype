import { useLocation, useNavigate, useParams } from "react-router-dom";
import { warehouseItemsByCode, warehouseRecords } from "../data/warehouses";
import { WarehouseActivitySection } from "../components/warehouse/WarehouseActivitySection";
import { WarehouseDetails } from "../components/warehouse/WarehouseDetails";
import { WarehouseItemsSection } from "../components/warehouse/WarehouseItemsSection";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function WarehouseDetailPage() {
    const { warehouse: warehouseParam } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const warehouse =
        warehouseRecords.find(
            (entry) =>
                entry.code === decodeURIComponent(warehouseParam ?? "") ||
                entry.name === decodeURIComponent(warehouseParam ?? ""),
        ) ?? warehouseRecords[0];
    const warehouseBasePath = location.pathname.startsWith(
        "/inventory/warehouses",
    )
        ? "/inventory/warehouses"
        : "/warehouses";
    const items = warehouseItemsByCode[warehouse.code] ?? [];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb={`Home / Warehouses / ${warehouse.name}`}
                title={warehouse.name}
                subtitle={`${warehouse.code} · ${warehouse.company}`}
                actions={
                    <Button
                        variant="secondary"
                        onClick={() => navigate(warehouseBasePath)}
                    >
                        Back to Warehouses
                    </Button>
                }
            />
            <div className="warehouse-detail-stack">
                <div className="warehouse-kpi-grid">
                    <Card className="warehouse-kpi-card">
                        <span className="eyebrow">Total Items</span>
                        <strong>{warehouse.totalItems}</strong>
                    </Card>
                    <Card className="warehouse-kpi-card">
                        <span className="eyebrow">In Stock</span>
                        <strong>{warehouse.inStock}</strong>
                    </Card>
                    <Card className="warehouse-kpi-card">
                        <span className="eyebrow">Out of Stock</span>
                        <strong>{warehouse.outOfStock}</strong>
                    </Card>
                    <Card className="warehouse-kpi-card">
                        <span className="eyebrow">Total Stock Value</span>
                        <strong>{warehouse.totalStockValue}</strong>
                    </Card>
                </div>
                <WarehouseDetails warehouse={warehouse} />
                <WarehouseItemsSection items={items} />
                <WarehouseActivitySection />
            </div>
        </PageContainer>
    );
}
