import { useMemo, useState } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { PageContainer } from "../components/ui/PageContainer"
import { PageHeader } from "../components/ui/PageHeader"
import { stockMovementItems, stockMovementWarehouses } from "../data/stockMovementItems"

const movementTypes = [
  {
    value: "receipt",
    label: "Material Receipt",
    description: "Receive stock into a target warehouse",
  },
  {
    value: "issue",
    label: "Material Issue",
    description: "Issue stock from a source warehouse",
  },
  {
    value: "transfer",
    label: "Material Transfer",
    description: "Move stock between two warehouses",
  },
]

function MovementTypeCard({ movement, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`stock-movement-type-card ${selected ? "stock-movement-type-card--selected" : ""}`}
      onClick={onSelect}
    >
      <span className="stock-movement-type-card__title">{movement.label}</span>
      <span className="stock-movement-type-card__description">{movement.description}</span>
    </button>
  )
}

function ItemResults({ items, selectedItem, onSelect }) {
  return (
    <div className="stock-movement-item-results" aria-label="Item results">
      {items.length > 0 ? items.map((item) => (
        <button
          type="button"
          key={item.code}
          className={`stock-movement-item-result ${selectedItem?.code === item.code ? "stock-movement-item-result--selected" : ""}`}
          onClick={() => onSelect(item)}
        >
          <span>{item.code} — {item.name}</span>
        </button>
      )) : (
        <p className="stock-movement-item-results__empty">No matching items</p>
      )}
    </div>
  )
}

function WarehouseInput({ label, id, value, onChange }) {
  return (
    <Input
      id={id}
      label={label}
      placeholder="Type to search warehouses..."
      list="stock-movement-warehouses"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export function NewStockMovementPage() {
  const [movementType, setMovementType] = useState("")
  const [itemQuery, setItemQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState("1")
  const [sourceWarehouse, setSourceWarehouse] = useState("")
  const [targetWarehouse, setTargetWarehouse] = useState("")
  const [remarks, setRemarks] = useState("")

  const filteredItems = useMemo(() => {
    const normalizedQuery = itemQuery.trim().toLowerCase()
    if (!normalizedQuery) return stockMovementItems
    return stockMovementItems.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(normalizedQuery))
  }, [itemQuery])

  const selectedMovement = movementTypes.find((movement) => movement.value === movementType)
  const hasValidQuantity = Number(quantity) > 0
  const isKnownWarehouse = (warehouse) => stockMovementWarehouses.includes(warehouse)
  const hasRequiredWarehouse = movementType === "receipt"
    ? isKnownWarehouse(targetWarehouse)
    : movementType === "issue"
      ? isKnownWarehouse(sourceWarehouse)
      : isKnownWarehouse(sourceWarehouse) && isKnownWarehouse(targetWarehouse)
  const canSubmit = Boolean(movementType && selectedItem && hasValidQuantity && hasRequiredWarehouse)

  const handleMovementTypeChange = (value) => {
    setMovementType(value)
    setSourceWarehouse("")
    setTargetWarehouse("")
  }

  return (
    <PageContainer className="stock-movement-page">
      <PageHeader
        breadcrumb="Home / Stock Movements / New"
        title="Record Stock Movement"
        subtitle="Record a stock movement for Apex Manufacturing Pvt Ltd"
      />

      <section className="stock-movement-section">
        <div className="section-heading stock-movement-section__heading">
          <div>
            <h2>1. Choose movement type</h2>
            <p>Select the type of stock movement you want to record.</p>
          </div>
        </div>
        <div className="stock-movement-type-grid">
          {movementTypes.map((movement) => (
            <MovementTypeCard
              key={movement.value}
              movement={movement}
              selected={movement.value === movementType}
              onSelect={() => handleMovementTypeChange(movement.value)}
            />
          ))}
        </div>
      </section>

      {selectedMovement && (
        <>
          <section className="stock-movement-section">
            <div className="section-heading stock-movement-section__heading">
              <div>
                <h2>2. Item + warehouse details</h2>
                <p>Choose an item, set the quantity and warehouse details, then submit the movement.</p>
              </div>
            </div>

            <Card className="stock-movement-details-card">
              <div className="stock-movement-details-card__column stock-movement-details-card__column--item">
                <div className="stock-movement-panel-heading">
                  <span className="stock-movement-panel-heading__eyebrow">Item selection</span>
                  <h3>Choose an item</h3>
                  <p>Search by item code or name, then select one result.</p>
                </div>
                <Input
                  label="Search item"
                  placeholder="Search by code or name"
                  value={itemQuery}
                  onChange={(event) => {
                    setItemQuery(event.target.value)
                    if (selectedItem && !`${selectedItem.code} ${selectedItem.name}`.toLowerCase().includes(event.target.value.trim().toLowerCase())) {
                      setSelectedItem(null)
                    }
                  }}
                />
                <ItemResults items={filteredItems} selectedItem={selectedItem} onSelect={setSelectedItem} />
              </div>

              <div className="stock-movement-details-card__column stock-movement-details-card__column--movement">
                <div className="stock-movement-panel-heading">
                  <span className="stock-movement-panel-heading__eyebrow">Movement details</span>
                  <h3>Set quantity and warehouse</h3>
                  <p>Provide the details required for this {selectedMovement.label.toLowerCase()}.</p>
                </div>
                <div className={`stock-movement-fields stock-movement-fields--${movementType}`}>
                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                  {movementType === "receipt" && (
                    <WarehouseInput
                      id="target-warehouse"
                      label="Target warehouse"
                      value={targetWarehouse}
                      onChange={setTargetWarehouse}
                    />
                  )}
                  {movementType === "issue" && (
                    <WarehouseInput
                      id="source-warehouse"
                      label="Source warehouse"
                      value={sourceWarehouse}
                      onChange={setSourceWarehouse}
                    />
                  )}
                  {movementType === "transfer" && (
                    <>
                      <WarehouseInput
                        id="from-warehouse"
                        label="From warehouse"
                        value={sourceWarehouse}
                        onChange={setSourceWarehouse}
                      />
                      <WarehouseInput
                        id="to-warehouse"
                        label="To warehouse"
                        value={targetWarehouse}
                        onChange={setTargetWarehouse}
                      />
                    </>
                  )}
                  <label className="field stock-movement-remarks" htmlFor="movement-remarks">
                    <span className="field__label">Remarks</span>
                    <textarea
                      id="movement-remarks"
                      className="textarea-control"
                      placeholder="Add any notes for this movement"
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            </Card>
          </section>

          <section className="stock-movement-review">
            <div>
              <h2>Review movement</h2>
              <p>Review the selected values before submitting this movement.</p>
              <div className="stock-movement-review__summary">
                <span>{selectedMovement.label}</span>
                <span>{selectedItem ? `${selectedItem.code} — ${selectedItem.name}` : "Select an item"}</span>
                <span>Quantity: {quantity || "—"}</span>
                {movementType !== "issue" && <span>Target: {targetWarehouse || "—"}</span>}
                {movementType !== "receipt" && <span>Source: {sourceWarehouse || "—"}</span>}
              </div>
            </div>
            <Button disabled={!canSubmit}>Submit {movementType}</Button>
          </section>
        </>
      )}

      <datalist id="stock-movement-warehouses">
        {stockMovementWarehouses.map((warehouse) => <option key={warehouse} value={warehouse} />)}
      </datalist>
    </PageContainer>
  )
}
