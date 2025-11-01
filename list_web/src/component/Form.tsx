import { useState } from "react";
import "../style/Form.css";
import ENDPOINTS from "../utils/endpoints";

const FormMain = () => {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    async function handleSubmit() {
        // e.preventDefault();

        // 🔹 нормализуем ссылку перед отправкой
        let normalizedLink = link.trim();
        if (!/^https?:\/\//i.test(normalizedLink)) {
            normalizedLink = "https://" + normalizedLink;
        }

        if (!name.trim() || !normalizedLink.trim()) {
            alert("Заполните оба поля!");
            return;
        }

        try {
            const response = await fetch(ENDPOINTS.add_link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    link: normalizedLink,
                }),
            });

            if (!response.ok) {
                alert("Ошибка при добавлении сайта");
                return;
            }

            alert("Сайт успешно добавлен");
            setName("");
            setLink("");
        } catch (err) {
            console.error(err);
            alert("Не удалось отправить запрос. Проверьте подключение к серверу.");
        }
    }

    return (
        <form className="main_form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ссылка"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit" className="delete_button">Добавить</button>
        </form>
    );
};

export default FormMain;
