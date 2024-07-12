#!/usr/bin/python3
"""
    project model
"""
import uuid
from models.base import Base
from sqlalchemy import String, ForeignKey, Enum, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Project(Base):
    """
    project class where table models is defined and contains
    methods related with project model
    """

    __tablename__ = 'projects'

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    title: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(String(250), nullable=False)
    proposal: Mapped[str] = mapped_column(String(250), nullable=True)
    application: Mapped[str] = mapped_column(Enum(
                        'open', 'closed', name='application'), default='open')
    roles: Mapped[list] = mapped_column(JSON, nullable=False)

    creator_id: Mapped[str] = mapped_column(String(36), ForeignKey('users.id'))
    creator = relationship('User', back_populates='projects')

    user_projects = relationship('UserProject', back_populates='project',
                                 cascade='all, delete-orphan')

    def __init__(self, creator_id, *args, **kwargs):
        """
        initialize or used to create brand new project at first
        """

        if not kwargs:
            raise ValueError("Not enough information provided")

        self.id = str(uuid.uuid4())
        self.creator_id = creator_id
        for key, value in kwargs.items():
            setattr(self, key, value)

    def save_project(self):
        """
        store the created project to the storage engine
        """

        from models import storage
        storage.new(self)
        storage.save()

    def __str__(self) -> str:
        """prints user readable(nice) string representation of Project model"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def to_dict(self):
        """return the dictionary representation of the project class"""
        project_dict = {}
        project_dict = self.__dict__.copy()
        project_dict["__class__"] = str(type(self).__name__)
        if "_sa_instance_state" in project_dict:
            del project_dict["_sa_instance_state"]
        return project_dict
