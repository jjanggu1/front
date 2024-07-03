import { useCallback, useState, ChangeEvent } from "react"

type InitialForm = {
    [key: string]: string;
}

const useInputs = (initialForm: InitialForm) => {
    const [form, setForm] = useState(initialForm);

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChangeInput, reset] as const;
}

export default useInputs;