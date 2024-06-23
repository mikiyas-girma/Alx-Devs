#!/usr/bin/python3
"""
    a model to represent a many to many relationships
    between users and projects
"""

from sqlalchemy import Integer, String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.base import Base


class UserProject(Base):
    """
    a class to create a relationship table between users and projects
    """

    __tablename__ = 'user_projects'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey('users.id'))
    project_id: Mapped[str] = mapped_column(String(36),
                                            ForeignKey('projects.id'))

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
