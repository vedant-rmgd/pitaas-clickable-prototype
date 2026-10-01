import { useState } from "react";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export function CostCenterFormDialog({
    open,
    mode,
    costCenter,
    parentOptions,
    onClose,
    onSave,
}) {
    const isEdit = mode === "edit";
    const formId = isEdit ? "edit-cost-center-form" : "new-cost-center-form";
    const [values, setValues] = useState(() => ({
        name: costCenter?.name ?? "",
        parent:
            costCenter?.parent && costCenter.parent !== "—"
                ? costCenter.parent
                : "none",
        branchCode:
            costCenter?.branchCode && costCenter.branchCode !== "—"
                ? costCenter.branchCode
                : "",
        auditable: costCenter?.auditable ?? false,
    }));

    const update = (field) => (event) =>
        setValues((current) => ({ ...current, [field]: event.target.value }));
    const submit = (event) => {
        event.preventDefault();
        if (!values.name.trim()) return;
        onSave({
            ...values,
            name: values.name.trim(),
            parent: values.parent === "none" ? "—" : values.parent,
            branchCode: values.branchCode.trim() || "—",
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="cost-center-form-dialog"
            title={
                isEdit
                    ? `Edit cost center: ${costCenter?.id}`
                    : "New cost center"
            }
            description={
                isEdit
                    ? "Update the cost center details and audit settings."
                    : "Add a cost center for organizing branch activity."
            }
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form={formId}
                        disabled={!values.name.trim()}
                    >
                        {isEdit ? "Save changes" : "Create"}
                    </Button>
                </>
            }
        >
            <form id={formId} className="cost-center-form" onSubmit={submit}>
                <Input
                    label="Cost center name"
                    value={values.name}
                    onChange={update("name")}
                    required
                    readOnly={isEdit}
                />
                <Select
                    label="Parent cost center"
                    value={values.parent}
                    onChange={update("parent")}
                    options={parentOptions}
                    hint="Optional. Select a parent to organize this cost center in the hierarchy."
                />
                <Input
                    label="Branch code"
                    value={values.branchCode === "—" ? "" : values.branchCode}
                    onChange={update("branchCode")}
                />
                <label className="cost-center-checkbox">
                    <input
                        type="checkbox"
                        checked={values.auditable}
                        onChange={(event) =>
                            setValues((current) => ({
                                ...current,
                                auditable: event.target.checked,
                            }))
                        }
                    />
                    <span>Is auditable</span>
                </label>
                <span className="field__message cost-center-checkbox__hint">
                    Allows this cost center to be included in audit scope.
                </span>
            </form>
        </Dialog>
    );
}
