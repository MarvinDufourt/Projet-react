import React, {useState} from "react";

interface FormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    title: string;
    description?: string;
}

const TaskForm = ({onSubmit}: FormProps) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(value);
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({title: "", description: ""});
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Titre :
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>

            <label>
                Description :
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default TaskForm;