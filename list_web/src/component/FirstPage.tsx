import { useEffect, useState } from "react";
import ENDPOINTS from "../utils/endpoints";
import "../style/Link.css";

const FirstPage = () => {
    const [links, setLinks] = useState<Record<string, Record<string, string>>>({})

    async function get_links() {
        const response = await fetch(ENDPOINTS.get_links)
        if (response.status != 200) {
            alert("Ошибка при получении ссылок");
            return;
        }
        const data = await response.json();
        setLinks(data);
    }

    async function delete_links(link_id: string) {
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

    useEffect(() => {
        console.log("First Page mounted");
        get_links();
    }, [])

    return (
        <div className="page_area">
            {Object.keys(links).map((key) => (
                <form className="element_link" onSubmit={() => { delete_links(key) }}>
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