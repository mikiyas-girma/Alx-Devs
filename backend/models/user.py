#!/usr/bin/python3
"""
User model
"""
import uuid
from models.base import Base
from sqlalchemy import Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column


class User(Base):
    """ user class containing several methods for user functionality
    """
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True,
                                       nullable=False)
    password_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    skills: Mapped[list[str]] = mapped_column(JSON, nullable=True)
    team_count: Mapped[int] = mapped_column(Integer, default=0)

    def __init__(self, *args, **kwargs):
        """Instantiates new user """
        from models import storage
        if len(kwargs) > 0:
            for key, value in kwargs.items():
                self.__setattr__(key, value)
        else:
            self.id = str(uuid.uuid4())
            self.name = 'User1'
            self.username = 'username1'
            self.email = 'user1@gmail.com'
            self.password_hash = '12345'
            self.skills = 'skills in json'
            self.about = 'passionate software developer'
            self.team_count = 10
        storage.new(self)

    def save_user(self):
        """stores the user to storage engine"""
        from models import storage
        storage.save()

    def __str__(self) -> str:
        """prints user readable string representation of User model"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def to_dict(self):
        """return the dictionary representation of the user class"""
        dict = {}
        dict = self.__dict__.copy()
        dict["__class__"] = str(type(self).__name__)
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
        return dict
