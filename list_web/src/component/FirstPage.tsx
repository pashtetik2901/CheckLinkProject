import { useEffect, useState } from "react";
import ENDPOINTS from "../utils/endpoints";
import "../style/Link.css";

const FirstPage = () => {
    const [links, setLinks] = useState<Record<string, Record<string, string>>>({})

    async function get_links() {
        try {
            const response = await fetch(ENDPOINTS.get_links)
            if (response.status != 200) {
                alert("Ошибка при получении ссылок");
                return;
            }
            const data = await response.json();
            setLinks(data);
        }
        catch (err) {
            console.log(`Error: ${err}`)
            alert(`Не удалось отправить запрос. Проверьте подключение к серверу. Ошибка: ${err}`);
        }
    }

    async function delete_links(link_id: string) {
        try {
            const response = await fetch(ENDPOINTS.delete_link(link_id), {
                method: 'DELETE',
            })
            if (response.status != 200) {
                alert("Ошибка при удалении ссылки");
                return;
            }
            alert("Ссылка успешно удалена");
            get_links();
        }
        catch (err) {
            console.log(`Error: ${err}`)
            alert(`Не удалось отправить запрос. Проверьте подключение к серверу. Ошибка: ${err}`);
        }
    }

    useEffect(() => {
        console.log("First Page mounted");
        get_links();
    }, [])

    return (
        <div className="page_area">
            {Object.keys(links).map((key) => (
                <form className="element_link" onSubmit={() => { delete_links(key) }} key={key}>
                    <div className="prewiew_link">
                        <h4>{links[key].name}</h4>
                        <a href={links[key].link}>Открыть</a>
                    </div>
                    <iframe
                        className="web_page"
                        src={links[key].link}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        title={links[key].name}
                    />
                    <button type="submit">Удалить</button>
                </form>
            ))}
        </div>
    )
}

export default FirstPage;