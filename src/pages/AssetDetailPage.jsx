import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { assets } from "../data/assets";
import { assetMovements } from "../data/assetMovements";
import { AssetInfoTab } from "../components/asset/AssetInfoTab";
import { AssetMovementHistory } from "../components/asset/AssetMovementHistory";
import { DeleteAssetModal } from "../components/asset/DeleteAssetModal";
import { DisposeAssetModal } from "../components/asset/DisposeAssetModal";
import { EditAssetModal } from "../components/asset/EditAssetModal";
import { Button } from "../components/ui/Button";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

export function AssetDetailPage() {
    const { name } = useParams();
    const selectedAsset = assets.find(
        (entry) => entry.name === decodeURIComponent(name ?? ""),
    );
    const asset = { ...assets[0], ...(selectedAsset ?? {}) };
    const location = useLocation();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [editOpen, setEditOpen] = useState(false);
    const [disposeOpen, setDisposeOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <PageContainer>
            <PageHeader
                breadcrumb={`Home / Assets / ${asset.name}`}
                title={asset.name}
                subtitle={`${asset.category} · ${asset.company}`}
                actions={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setEditOpen(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setDeleteOpen(true)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setDisposeOpen(true)}
                        >
                            Dispose
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                navigate(
                                    location.pathname.startsWith("/am/assets")
                                        ? "/am/assets"
                                        : "/assets",
                                )
                            }
                        >
                            Back to Assets
                        </Button>
                    </>
                }
            />
            <div className="asset-detail-content">
                <div
                    className="asset-tabs"
                    role="tablist"
                    aria-label="Asset detail sections"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "info"}
                        className={
                            tab === "info"
                                ? "asset-tab asset-tab--active"
                                : "asset-tab"
                        }
                        onClick={() => setTab("info")}
                    >
                        Asset info
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "movement"}
                        className={
                            tab === "movement"
                                ? "asset-tab asset-tab--active"
                                : "asset-tab"
                        }
                        onClick={() => setTab("movement")}
                    >
                        Movement history
                    </button>
                </div>
                {tab === "info" ? (
                    <AssetInfoTab asset={asset} />
                ) : (
                    <AssetMovementHistory movements={assetMovements} />
                )}
            </div>
            <EditAssetModal
                asset={asset}
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <DisposeAssetModal
                asset={asset}
                open={disposeOpen}
                onClose={() => setDisposeOpen(false)}
            />
            <DeleteAssetModal
                asset={asset}
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            />
        </PageContainer>
    );
}
