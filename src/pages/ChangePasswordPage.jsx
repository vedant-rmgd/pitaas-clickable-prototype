import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";

function PasswordField({
    id,
    label,
    hint,
    value,
    onChange,
    visible,
    onToggle,
    minLength,
}) {
    return (
        <label className="field password-field" htmlFor={id}>
            <span className="field__label">{label}</span>
            <span className="password-field__control">
                <input
                    id={id}
                    className="control"
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    minLength={minLength}
                    required
                />
                <button
                    type="button"
                    className="icon-button password-field__toggle"
                    aria-label={
                        visible
                            ? `Hide ${label.toLowerCase()}`
                            : `Show ${label.toLowerCase()}`
                    }
                    onClick={onToggle}
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </span>
            {hint && <span className="field__message">{hint}</span>}
        </label>
    );
}

export function ChangePasswordPage() {
    const [values, setValues] = useState({
        current: "",
        next: "",
        confirm: "",
    });
    const [visible, setVisible] = useState({
        current: false,
        next: false,
        confirm: false,
    });
    const updateValue = (field) => (event) =>
        setValues((current) => ({ ...current, [field]: event.target.value }));
    const toggleVisibility = (field) => () =>
        setVisible((current) => ({ ...current, [field]: !current[field] }));

    return (
        <PageContainer className="password-page">
            <PageHeader
                breadcrumb="Home / Settings / Password"
                title="Change password"
                subtitle="Choose a strong, unique password to keep your account secure."
            />
            <Card className="password-card">
                <div className="password-card__body">
                    <div className="password-card__header">
                        <h2>Password details</h2>
                        <p>
                            Enter your current password, then create a new
                            password with at least 8 characters.
                        </p>
                    </div>
                    <form
                        id="change-password-form"
                        className="password-form"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <PasswordField
                            id="current-password"
                            label="Current password"
                            value={values.current}
                            onChange={updateValue("current")}
                            visible={visible.current}
                            onToggle={toggleVisibility("current")}
                        />
                        <PasswordField
                            id="new-password"
                            label="New password"
                            hint="Use at least 8 characters."
                            value={values.next}
                            onChange={updateValue("next")}
                            visible={visible.next}
                            onToggle={toggleVisibility("next")}
                            minLength={8}
                        />
                        <PasswordField
                            id="confirm-password"
                            label="Confirm new password"
                            value={values.confirm}
                            onChange={updateValue("confirm")}
                            visible={visible.confirm}
                            onToggle={toggleVisibility("confirm")}
                        />
                    </form>
                </div>
                <div className="password-card__footer">
                    <Button type="submit" form="change-password-form">
                        Change password
                    </Button>
                </div>
            </Card>
        </PageContainer>
    );
}
