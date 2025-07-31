"""
Configuração do banco de dados usando SQLAlchemy.

Este módulo contém a configuração do banco de dados, incluindo:
- Configuração da conexão com SQLite
- Criação da sessão do banco de dados
- Função para criar as tabelas
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Carrega as variáveis de ambiente
load_dotenv()

# URL do banco de dados (SQLite para desenvolvimento)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./articles.db")

# Criação do engine do SQLAlchemy
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Criação da sessão local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

def get_db():
    """
    Função para obter uma sessão do banco de dados.
    
    Returns:
        Session: Sessão do banco de dados
        
    Yields:
        Session: Sessão do banco de dados que será fechada automaticamente
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """
    Cria todas as tabelas no banco de dados.
    
    Esta função deve ser chamada na inicialização da aplicação
    para garantir que todas as tabelas existam.
    """
    Base.metadata.create_all(bind=engine) 