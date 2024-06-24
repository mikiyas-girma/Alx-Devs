#!/usr/bin/python3
"""
    a model to represent a many to many relationships
    between users and projects
"""

import uuid
from sqlalchemy import String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.base import Base


class UserProject(Base):
    """
    a class to create a relationship table between users and projects
    """

    __tablename__ = 'user_projects'

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(36),
                                         ForeignKey('users.id',
                                                    ondelete='CASCADE'))

    project_id: Mapped[str] = mapped_column(String(36),
                                            ForeignKey('projects.id',
                                            ondelete='CASCADE'))

    role: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[str] = mapped_column(Enum('pending', 'approved', 'rejected',
                                             name='status'), default='pending')

    user = relationship('User', back_populates='user_projects')
    project = relationship('Project', back_populates='user_projects')

    def __init__(self, *args, **kwargs):
        """
            creates a relation between a user and a project
        """
        if not kwargs:
            raise ValueError("Not enough information provided")

        self.id = str(uuid.uuid4())
        for key, value in kwargs.items():
            setattr(self, key, value)

    def save_user_project(self):
        """
            stores the relationship between user and project
            in user_projects table
        """
        from models import storage

        storage.new(self)
        storage.save()

    def __str__(self) -> str:
        """prints user readable(nice) string representation of Project model"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def to_dict(self):
        """return the dictionary representation of the project class"""
        user_project_dict = {}
        user_project_dict = self.__dict__.copy()
        user_project_dict["__class__"] = str(type(self).__name__)
        if "_sa_instance_state" in user_project_dict:
            del user_project_dict["_sa_instance_state"]
        return user_project_dict
