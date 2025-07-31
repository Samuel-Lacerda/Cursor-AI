"""
Aplicação principal FastAPI para o gerador de artigos WordPress.

Este módulo contém:
- Configuração da aplicação FastAPI
- Rotas de autenticação
- Rotas de geração de artigos
- Middleware CORS
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from typing import List
import os
from dotenv import load_dotenv

from .database import get_db, create_tables
from .models import User, Article
from .schemas import UserCreate, User as UserSchema, Token, UserLogin, ArticleCreate, Article as ArticleSchema, ArticleList
from .auth import authenticate_user, create_access_token, get_current_active_user, get_password_hash
from .ai_service import generate_article, generate_article_variations, improve_article

# Carrega variáveis de ambiente
load_dotenv()

# Criação da aplicação FastAPI
app = FastAPI(
    title="Gerador de Artigos WordPress com IA",
    description="API para geração de artigos usando Google Gemini",
    version="1.0.0"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Criação das tabelas na inicialização
@app.on_event("startup")
async def startup_event():
    """
    Evento executado na inicialização da aplicação.
    Cria as tabelas do banco de dados.
    """
    create_tables()

# Rota raiz
@app.get("/")
async def root():
    """
    Rota raiz da API.
    
    Returns:
        dict: Informações sobre a API
    """
    return {
        "message": "Gerador de Artigos WordPress com IA",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Rotas de Autenticação
@app.post("/register", response_model=UserSchema)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Registra um novo usuário.
    
    Args:
        user (UserCreate): Dados do usuário para registro
        db (Session): Sessão do banco de dados
        
    Returns:
        UserSchema: Dados do usuário criado
        
    Raises:
        HTTPException: Se username ou email já existirem
    """
    # Verifica se username já existe
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Nome de usuário já registrado"
        )
    
    # Verifica se email já existe
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    
    # Cria o hash da senha
    hashed_password = get_password_hash(user.password)
    
    # Cria o usuário
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@app.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Autentica um usuário e retorna token JWT.
    
    Args:
        user_credentials (UserLogin): Credenciais do usuário
        db (Session): Sessão do banco de dados
        
    Returns:
        Token: Token JWT de acesso
        
    Raises:
        HTTPException: Se as credenciais forem inválidas
    """
    user = authenticate_user(db, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Rotas de Artigos
@app.post("/articles/generate", response_model=ArticleSchema)
async def create_article(
    article_data: ArticleCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Gera um novo artigo usando IA.
    
    Args:
        article_data (ArticleCreate): Dados para geração do artigo
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        ArticleSchema: Artigo gerado
        
    Raises:
        HTTPException: Se houver erro na geração
    """
    try:
        # Gera o artigo usando IA
        ai_article = generate_article(
            topic=article_data.topic,
            prompt=article_data.prompt,
            word_count=article_data.word_count
        )
        
        # Salva no banco de dados
        db_article = Article(
            title=ai_article["title"],
            content=ai_article["content"],
            prompt=ai_article["prompt"],
            user_id=current_user.id
        )
        
        db.add(db_article)
        db.commit()
        db.refresh(db_article)
        
        return db_article
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar artigo: {str(e)}"
        )

@app.get("/articles", response_model=ArticleList)
async def get_articles(
    skip: int = 0,
    limit: int = 10,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Lista os artigos do usuário atual.
    
    Args:
        skip (int): Número de artigos para pular
        limit (int): Número máximo de artigos
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        ArticleList: Lista de artigos com total
    """
    articles = db.query(Article).filter(
        Article.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    total = db.query(Article).filter(
        Article.user_id == current_user.id
    ).count()
    
    return {
        "articles": articles,
        "total": total
    }

@app.get("/articles/{article_id}", response_model=ArticleSchema)
async def get_article(
    article_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Obtém um artigo específico.
    
    Args:
        article_id (int): ID do artigo
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        ArticleSchema: Artigo solicitado
        
    Raises:
        HTTPException: Se o artigo não for encontrado
    """
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=404,
            detail="Artigo não encontrado"
        )
    
    return article

@app.delete("/articles/{article_id}")
async def delete_article(
    article_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Deleta um artigo.
    
    Args:
        article_id (int): ID do artigo
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        dict: Confirmação de exclusão
        
    Raises:
        HTTPException: Se o artigo não for encontrado
    """
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=404,
            detail="Artigo não encontrado"
        )
    
    db.delete(article)
    db.commit()
    
    return {"message": "Artigo deletado com sucesso"}

# Rota para melhorar artigo
@app.post("/articles/{article_id}/improve")
async def improve_existing_article(
    article_id: int,
    improvement_type: str = "general",
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Melhora um artigo existente usando IA.
    
    Args:
        article_id (int): ID do artigo
        improvement_type (str): Tipo de melhoria
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        dict: Artigo melhorado
        
    Raises:
        HTTPException: Se o artigo não for encontrado ou erro na melhoria
    """
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=404,
            detail="Artigo não encontrado"
        )
    
    try:
        improved_content = improve_article(article.content, improvement_type)
        
        # Atualiza o artigo
        article.content = improved_content
        db.commit()
        db.refresh(article)
        
        return {
            "message": "Artigo melhorado com sucesso",
            "article": article
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao melhorar artigo: {str(e)}"
        )

# Rota para gerar variações
@app.post("/articles/generate/variations")
async def create_article_variations(
    topic: str,
    base_prompt: str,
    variations: int = 3,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Gera variações de um artigo.
    
    Args:
        topic (str): Tópico do artigo
        base_prompt (str): Prompt base
        variations (int): Número de variações
        current_user (User): Usuário atual
        db (Session): Sessão do banco de dados
        
    Returns:
        dict: Lista de artigos gerados
    """
    try:
        articles = generate_article_variations(topic, base_prompt, variations)
        
        # Salva as variações no banco
        saved_articles = []
        for article_data in articles:
            db_article = Article(
                title=article_data["title"],
                content=article_data["content"],
                prompt=article_data["prompt"],
                user_id=current_user.id
            )
            db.add(db_article)
            saved_articles.append(db_article)
        
        db.commit()
        
        # Atualiza os IDs
        for article in saved_articles:
            db.refresh(article)
        
        return {
            "message": f"{len(saved_articles)} variações geradas com sucesso",
            "articles": saved_articles
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar variações: {str(e)}"
        ) 