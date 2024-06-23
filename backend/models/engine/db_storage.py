#!/usr/bin/python3
"""module for interacting with database """

from os import getenv
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base import Base
from models.user import User  # noqa
from models.project import Project  # noqa
from models.userproject import UserProject  # noqa

load_dotenv()


class DBStorage:
    """dbstorage engine's class used for creating the db engine, session
    and managing the database storage and operations on it
    """

    __engine = None
    __session = None

    def __init__(self):
        """creates the database engine and prepares the working environment"""
        self.__engine = create_engine(
            url='mysql+mysqldb://{}:{}@{}/{}'
                .format(getenv("MYSQL_USER"),
                        getenv("MYSQL_PWD"),
                        getenv("MYSQL_HOST"),
                        getenv("MYSQL_DB")),
            echo=True,
            pool_pre_ping=True
        )

    def reload(self):
        """
        creates tables for the models in the database and
        establishes a session to work with
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)
        self.__session = scoped_session(session_factory)

    def new(self, obj):
        """ adds the passed obj to database storage
        """
        if not obj:
            return
        self.__session.add(obj)

    def all(self, cls=None):
        """queries on the current db session and returns
            a dictionary of models
        """
        classes = [User, Project, UserProject]
        obj_dict = {}
        if cls is None:
            for cls in classes:
                query = self.__session.query(cls)
                for obj in query.all():
                    key = obj.__class__.__name__ + '.' + str(obj.id)
                    print(key)
                    obj_dict[key] = obj
        else:
            query = self.__session.query(cls)
            for obj in query.all():
                key = obj.__class__.__name__ + '.' + obj.id
                obj_dict[key] = obj
        return obj_dict

    def get(self, cls, id=None, username=None):
        """
        get specific object of the given class with given id or username
        """
        if id:
            match_string = cls.__name__ + '.' + id
            obj_dict = self.all(cls)
            return obj_dict.get(match_string)

        if username:
            obj_dict = self.all(cls)
            for key, value in obj_dict.items():
                if key.startswith(cls.__name__) and value.username == username:
                    return value

        return None

    def exists(self, cls, **kwargs):
        """
            Checks if an object of the given class with the given filter
            criteria exists. Returns True if it exists, False otherwise.
        """
        return self.__session.query(cls).filter_by(**kwargs).first()

    def delete(self, obj):
        """
            deletes an object of a class with given id
        """
        self.__session.delete(obj)

    def save(self):
        """commits all changes in the current database session"""
        self.__session.commit()

    def close(self):
        """
        calls remove() on the private session attribute
        """
        self.__session.close()
