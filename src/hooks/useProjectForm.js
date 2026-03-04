import { apiCreateProject } from "../services/api";
import { useForm } from "./useForm";

export function useProjectForm(token, onProjectCreated, setSelectedId) {
    const validate = (values) => {
        const errs = {};
        if (values.name !== undefined) {
            errs.name = values.name.trim().length < 3 ? "Minimo 3 caracteres" : null;
        }
        if (values.owner !== undefined) {
            errs.owner = values.owner.trim().length < 2 ? "Owner muy corto" : null;
        }
        if (values.budget !== undefined) {
            errs.budget = isNaN(Number(values.budget)) ? "Debe ser numero" : null;
        }
        return errs;
    };

    const {
        values,
        errors,
        isSubmitting: saving,
        onChange,
        onSubmit,
        reset
    } = useForm({ name: "", owner: "", budget: "0", status: "active" }, validate);

    const handleCreate = async (formValues) => {
        const created = await apiCreateProject({
            token,
            payload: {
                name: formValues.name,
                owner: formValues.owner,
                budget: Number(formValues.budget),
                status: formValues.status
            },
        });

        onProjectCreated(created);
        setSelectedId(created.id);
        reset();
    };

    return {
        name: values.name,
        setName: (val) => onChange("name", val),
        owner: values.owner,
        setOwner: (val) => onChange("owner", val),
        budget: values.budget,
        setBudget: (val) => onChange("budget", val),
        status: values.status,
        setStatus: (val) => onChange("status", val),
        saving,
        formErr: Object.values(errors).find(e => e !== null) || null,
        nameErr: errors.name,
        ownerErr: errors.owner,
        budgetErr: errors.budget,
        onCreate: (e) => onSubmit(e, handleCreate),
    };
}
