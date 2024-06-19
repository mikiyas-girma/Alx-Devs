#!/usr/bin/python3
"""module for deciding which storage engine to use
   that is either FileStorage or DBStorage
"""

from os import getenv
from dotenv import load_dotenv

load_dotenv()

if getenv('STORAGE_TYPE') == 'db':
    from models.engine.db_storage import DBStorage
    storage = DBStorage()
    storage.reload()
else:
    from models.engine.file_storage import FileStorage
    storage = FileStorage()
    storage.reload()
