import {
    itemsPerWarehouse,
    itemsPerWarehouseSummary,
} from "../data/itemsPerWarehouse";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function ItemsPerWarehousePage() {
    const columns = [
        { key: "warehouse", label: "Warehouse" },
        { key: "itemsInStock", label: "Items in stock", align: "right" },
    ];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Home / Reports / Items per warehouse"
                title="Items per warehouse"
                subtitle={`${itemsPerWarehouseSummary.totalItems} items across ${itemsPerWarehouseSummary.warehouseCount} warehouses`}
                actions={<Button>Aggregated</Button>}
            />
            <div className="report-section-stack">
                <Card className="table-card report-summary-card">
                    <div className="table-card__header">
                        <div>
                            <h2>Summary</h2>
                            <p>
                                Total items in stock across the{" "}
                                {itemsPerWarehouseSummary.warehouseCount} demo
                                warehouses.
                            </p>
                        </div>
                    </div>
                    <div className="report-summary-metrics">
                        <div className="report-summary-metric">
                            <span>Total items</span>
                            <strong>
                                {itemsPerWarehouseSummary.totalItems}
                            </strong>
                        </div>
                        <div className="report-summary-metric">
                            <span>Warehouses</span>
                            <strong>
                                {itemsPerWarehouseSummary.warehouseCount}
                            </strong>
                        </div>
                        <div className="report-summary-metric">
                            <span>Warehouses with stock</span>
                            <strong>
                                {itemsPerWarehouseSummary.warehousesWithStock}
                            </strong>
                        </div>
                    </div>
                </Card>
                <Card className="table-card report-table-card">
                    <div className="table-card__header">
                        <div>
                            <h2>Items by warehouse</h2>
                            <p>Counts view — one row per warehouse.</p>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={itemsPerWarehouse}
                        rowKey="warehouse"
                        emptyMessage="No warehouse item counts available."
                    />
                </Card>
            </div>
        </PageContainer>
    );
}
