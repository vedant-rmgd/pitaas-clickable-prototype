import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { items } from "../data/items";
import { unitsByItem } from "../data/units";
import { warehouseBalances } from "../data/warehouses";
import { Button } from "../components/ui/Button";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { BarcodesSection } from "../components/item/BarcodesSection";
import { GenerateUnitQrModal } from "../components/item/GenerateUnitQrModal";
import { IndividualUnitsTable } from "../components/item/IndividualUnitsTable";
import { ItemOverview } from "../components/item/ItemOverview";
import { SetItemQrModal } from "../components/item/SetItemQrModal";
import { StockByWarehouse } from "../components/item/StockByWarehouse";

export function ItemDetailPage() {
    const { itemCode } = useParams();
    const item = items.find((entry) => entry.code === itemCode) ?? items[0];
    const navigate = useNavigate();
    const [qrDialogOpen, setQrDialogOpen] = useState(false);
    const [unitDialogOpen, setUnitDialogOpen] = useState(false);
    const unitRows = unitsByItem[item.code] ?? unitsByItem.default;
    const stockByWarehouse = warehouseBalances[item.code] ?? [];

    return (
        <PageContainer>
            <PageHeader
                breadcrumb="Items / Item detail"
                title={item.name}
                subtitle={`Item code ${item.code} · ${item.group}`}
                actions={
                    <>
                        <Button onClick={() => setQrDialogOpen(true)}>
                            Set Item QR Code
                        </Button>
                        <Button onClick={() => setUnitDialogOpen(true)}>
                            Generate 10 Unit QR Codes
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/items")}
                        >
                            Back to items
                        </Button>
                    </>
                }
            />
            <div className="page-section-stack">
                <ItemOverview item={item} />
                <IndividualUnitsTable unitRows={unitRows} />
                <StockByWarehouse
                    stock={item.stock}
                    stockByWarehouse={stockByWarehouse}
                />
                <BarcodesSection />
            </div>
            <SetItemQrModal
                open={qrDialogOpen}
                onClose={() => setQrDialogOpen(false)}
            />
            <GenerateUnitQrModal
                open={unitDialogOpen}
                onClose={() => setUnitDialogOpen(false)}
            />
        </PageContainer>
    );
}
