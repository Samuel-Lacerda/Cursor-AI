"""
Modelos do banco de dados usando SQLAlchemy.

Este módulo define os modelos de dados para:
- User: Modelo de usuário com autenticação
- Article: Modelo de artigo gerado pela IA
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    """
    Modelo de usuário do sistema.
    
    Attributes:
        id (int): ID único do usuário
        username (str): Nome de usuário único
        email (str): Email único do usuário
        hashed_password (str): Senha criptografada
        is_active (bool): Status ativo do usuário
        created_at (datetime): Data de criação
        articles (relationship): Relacionamento com artigos
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamento com artigos
    articles = relationship("Article", back_populates="user")

class Article(Base):
    """
    Modelo de artigo gerado pela IA.
    
    Attributes:
        id (int): ID único do artigo
        title (str): Título do artigo
        content (str): Conteúdo completo do artigo
        prompt (str): Prompt usado para gerar o artigo
        user_id (int): ID do usuário que criou o artigo
        created_at (datetime): Data de criação
        user (relationship): Relacionamento com usuário
    """
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    prompt = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamento com usuário
    user = relationship("User", back_populates="articles") 