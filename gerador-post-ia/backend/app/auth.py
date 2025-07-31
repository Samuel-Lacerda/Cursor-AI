"""
Sistema de autenticação usando JWT.

Este módulo contém:
- Funções para hash e verificação de senhas
- Geração e verificação de tokens JWT
- Dependência para autenticação de rotas
"""

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from .database import get_db
from .models import User

# Carrega variáveis de ambiente
load_dotenv()

# Configurações de segurança
SECRET_KEY = os.getenv("SECRET_KEY", "sua_chave_secreta_aqui")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Contexto para hash de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bearer token para autenticação
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha em texto plano corresponde ao hash.
    
    Args:
        plain_password (str): Senha em texto plano
        hashed_password (str): Senha hasheada
        
    Returns:
        bool: True se a senha estiver correta, False caso contrário
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Gera o hash de uma senha.
    
    Args:
        password (str): Senha em texto plano
        
    Returns:
        str: Hash da senha
    """
    return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """
    Autentica um usuário verificando username/email e senha.
    
    Args:
        db (Session): Sessão do banco de dados
        username (str): Nome de usuário ou email
        password (str): Senha do usuário
        
    Returns:
        Optional[User]: Usuário autenticado ou None se falhar
    """
    # Busca por username ou email
    user = db.query(User).filter(
        (User.username == username) | (User.email == username)
    ).first()
    
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Cria um token JWT de acesso.
    
    Args:
        data (dict): Dados para incluir no token
        expires_delta (Optional[timedelta]): Tempo de expiração
        
    Returns:
        str: Token JWT
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

def verify_token(token: str) -> Optional[str]:
    """
    Verifica e decodifica um token JWT.
    
    Args:
        token (str): Token JWT
        
    Returns:
        Optional[str]: Username do token ou None se inválido
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        return username
    except JWTError:
        return None

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependência para obter o usuário atual baseado no token JWT.
    
    Args:
        credentials (HTTPAuthorizationCredentials): Credenciais do token
        db (Session): Sessão do banco de dados
        
    Returns:
        User: Usuário atual
        
    Raises:
        HTTPException: Se o token for inválido ou usuário não encontrado
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials
    username = verify_token(token)
    
    if username is None:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependência para obter o usuário atual ativo.
    
    Args:
        current_user (User): Usuário atual
        
    Returns:
        User: Usuário ativo
        
    Raises:
        HTTPException: Se o usuário estiver inativo
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo")
    
    return current_user 