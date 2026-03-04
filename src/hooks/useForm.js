import { useState, useCallback } from "react";

export function useForm(initialValues = {}, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = useCallback((name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));

        if (validate) {
            const fieldError = validate({ [name]: value });
            setErrors((prev) => ({ ...prev, [name]: fieldError[name] || null }));
        }
    }, [validate]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    }, [initialValues]);

    const onSubmit = useCallback(async (e, callback) => {
        if (e) e.preventDefault();

        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            if (Object.values(validationErrors).some(err => err !== null)) return;
        }

        setIsSubmitting(true);
        try {
            await callback(values);
        } finally {
            setIsSubmitting(false);
        }
    }, [values, validate]);

    return {
        values,
        errors,
        isSubmitting,
        onChange,
        reset,
        onSubmit,
        setValues,
        setErrors
    };
}
