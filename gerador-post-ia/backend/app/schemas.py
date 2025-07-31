"""
Schemas Pydantic para validação de dados.

Este módulo define os schemas para:
- Validação de entrada de dados
- Resposta de dados da API
- Autenticação e tokens
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Schemas de Usuário
class UserBase(BaseModel):
    """
    Schema base para usuário.
    
    Attributes:
        username (str): Nome de usuário
        email (EmailStr): Email do usuário
    """
    username: str
    email: EmailStr

class UserCreate(UserBase):
    """
    Schema para criação de usuário.
    
    Attributes:
        password (str): Senha em texto plano
    """
    password: str

class User(UserBase):
    """
    Schema para resposta de usuário.
    
    Attributes:
        id (int): ID do usuário
        is_active (bool): Status ativo
        created_at (datetime): Data de criação
    """
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Schemas de Autenticação
class Token(BaseModel):
    """
    Schema para token de acesso.
    
    Attributes:
        access_token (str): Token JWT
        token_type (str): Tipo do token (Bearer)
    """
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """
    Schema para dados do token.
    
    Attributes:
        username (Optional[str]): Nome de usuário do token
    """
    username: Optional[str] = None

class UserLogin(BaseModel):
    """
    Schema para login de usuário.
    
    Attributes:
        username (str): Nome de usuário ou email
        password (str): Senha do usuário
    """
    username: str
    password: str

# Schemas de Artigo
class ArticleBase(BaseModel):
    """
    Schema base para artigo.
    
    Attributes:
        title (str): Título do artigo
        content (str): Conteúdo do artigo
        prompt (str): Prompt usado para gerar
    """
    title: str
    content: str
    prompt: str

class ArticleCreate(BaseModel):
    """
    Schema para criação de artigo.
    
    Attributes:
        prompt (str): Prompt para gerar o artigo
        topic (str): Tópico do artigo
        word_count (Optional[int]): Número de palavras desejado
    """
    prompt: str
    topic: str
    word_count: Optional[int] = 500

class Article(ArticleBase):
    """
    Schema para resposta de artigo.
    
    Attributes:
        id (int): ID do artigo
        user_id (int): ID do usuário criador
        created_at (datetime): Data de criação
        user (User): Dados do usuário criador
    """
    id: int
    user_id: int
    created_at: datetime
    user: User

    class Config:
        from_attributes = True

class ArticleList(BaseModel):
    """
    Schema para lista de artigos.
    
    Attributes:
        articles (List[Article]): Lista de artigos
        total (int): Total de artigos
    """
    articles: List[Article]
    total: int 