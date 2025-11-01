const BASE_LINK = "http://91.229.9.194:8080"

const ENDPOINTS = {
    get_links: `${BASE_LINK}/get_links`,
    add_link: `${BASE_LINK}/add_link`,
    delete_link: (link_id: string) => `${BASE_LINK}/delete_linl/${link_id}`
}

export default ENDPOINTS;