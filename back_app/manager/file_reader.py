import os
import json
import logging
from uuid import uuid4

logging.basicConfig(
    level=logging.INFO,
    # format="%(asctime)s - %(levelname)s - %(message)s",
    format="%(levelname)s:     %(message)s",
)
logger = logging.getLogger(__name__)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
FILE_PATH_LINK = os.path.join(ROOT_DIR, "files", "links.json")


class Manager:

    @staticmethod
    def check_file(file_path: str) -> bool:
        return os.path.exists(file_path)

    @staticmethod
    def read_file(file_path: str = FILE_PATH_LINK) -> dict[str, dict[str, str]]:
        if Manager.check_file(file_path) == False:
            logger.warning(
                f"File {file_path} does not exist. And will be created now!"
            )
            with open(file_path, "w") as file:
                json.dump({}, file)

        logger.info(f"File was found: {file_path}")

        data = {}
        with open(file_path, "r") as file:
            data = json.load(file)

        return data

    @staticmethod
    def write_new_link(data: dict[str, str], file_path: str = FILE_PATH_LINK) -> None:
        try:
            new_uuid = str(uuid4())
            all_data = Manager.read_file(file_path)
            all_data[new_uuid] = data
            with open(file_path, "w") as file:
                json.dump(all_data, file, ensure_ascii=False, indent=4)
            logger.info(f"New link was added!")
        except Exception as e:
            logger.error(f"Error while writing new link: {e}")

    @staticmethod
    def delete_link(link_id: str, file_path: str = FILE_PATH_LINK) -> None:
        try:
            data = Manager.read_file(file_path)
            if data.get(link_id) is None:
                logger.warning(f"Link with id {link_id} does not exist.")
                return
            del data[link_id]
            with open(file_path, "w") as file:
                json.dump(data, file, ensure_ascii=False, indent=4)
            logger.info(f"Link with id {link_id} was deleted.")
        except Exception as err:
            logger.error(f"Error while deleting link: {err}")
