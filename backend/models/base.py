#!/usr/bin/python3
"""
   base module for other models to gain access to the same
   foundational functionality
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
