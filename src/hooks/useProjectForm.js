import { useState } from "react";
import { apiCreateProject } from "../services/api";

export function useProjectForm(token, onProjectCreated, setSelectedId) {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [budget, setBudget] = useState("0");
    const [status, setStatus] = useState("active");
    const [saving, setSaving] = useState(false);
    const [formErr, setFormErr] = useState(null);

    const nameErr = name && name.trim().length < 3 ? "Minimo 3 caracteres" : null;
    const ownerErr = owner && owner.trim().length < 2 ? "Owner muy corto" : null;
    const budgetErr = isNaN(Number(budget)) ? "Debe ser numero" : null;

    async function onCreate(e) {
        e.preventDefault();
        setFormErr(null);

        if (!name || name.trim().length < 3) {
            setFormErr("Revisa el nombre del proyecto");
            return;
        }
        if (!owner || owner.trim().length < 2) {
            setFormErr("Revisa el owner");
            return;
        }
        if (isNaN(Number(budget))) {
            setFormErr("Budget inválido");
            return;
        }

        setSaving(true);
        try {
            const created = await apiCreateProject({
                token,
                payload: { name, owner, budget: Number(budget), status },
            });

            onProjectCreated(created);
            setSelectedId(created.id);

            setName("");
            setOwner("");
            setBudget("0");
            setStatus("active");
        } catch (e) {
            setFormErr(`${e.status || ""} ${e.message || "Error creando"}`.trim());
        } finally {
            setSaving(false);
        }
    }

    return {
        name,
        setName,
        owner,
        setOwner,
        budget,
        setBudget,
        status,
        setStatus,
        saving,
        formErr,
        nameErr,
        ownerErr,
        budgetErr,
        onCreate,
    };
}
