#!/usr/bin/python3
"""
User model
"""
import uuid
import bcrypt
from models.base import Base
from sqlalchemy import Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column


class User(Base):
    """ user class containing several methods for user functionality
    """
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True,
                                          nullable=False)
    name: Mapped[str] = mapped_column(String(36), nullable=True)
    email: Mapped[str] = mapped_column(String(120), unique=True,
                                       nullable=False)
    password: Mapped[str] = mapped_column(String(128), nullable=False)
    skills: Mapped[list[str]] = mapped_column(JSON, nullable=True)
    team_count: Mapped[int] = mapped_column(Integer, default=0)

    def __init__(self, *args, **kwargs):
        """Instantiates new user """
        if not kwargs:
            raise ValueError("Not enough information provided")
        self.id = str(uuid.uuid4())
        for key, value in kwargs.items():
            if key == 'password':
                self.password = self._generate_pwd_hash(value)
            else:
                setattr(self, key, value)

    def _generate_pwd_hash(self, password: str) -> str:
        """Hashes the password using bcrypt """
        return bcrypt.hashpw(password.encode('utf-8'),
                             bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password: str) -> str:
        """verifies the password against the stored hash """
        return bcrypt.checkpw(password.encode('utf-8'),
                              self.password.encode('utf-8'))

    def save_user(self):
        """stores the user to storage engine"""
        from models import storage
        storage.new(self)
        storage.save()

    def __str__(self) -> str:
        """prints user readable string representation of User model"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def to_dict(self):
        """return the dictionary representation of the user class"""
        user_dict = {}
        user_dict = self.__dict__.copy()
        user_dict["__class__"] = str(type(self).__name__)
        if "_sa_instance_state" in user_dict:
            del user_dict["_sa_instance_state"]
        return user_dict
