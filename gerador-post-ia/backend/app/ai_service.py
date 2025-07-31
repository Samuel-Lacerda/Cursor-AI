"""
Serviço de IA usando Google Gemini API.

Este módulo contém:
- Configuração da API do Gemini
- Funções para geração de artigos
- Tratamento de prompts e respostas
"""

import google.generativeai as genai
import os
from dotenv import load_dotenv
from typing import Optional

# Carrega variáveis de ambiente
load_dotenv()

# Configuração da API do Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente")

genai.configure(api_key=GEMINI_API_KEY)

def generate_article(topic: str, prompt: str, word_count: int = 500) -> dict:
    """
    Gera um artigo usando a API do Gemini.
    
    Args:
        topic (str): Tópico principal do artigo
        prompt (str): Prompt específico do usuário
        word_count (int): Número aproximado de palavras desejado
        
    Returns:
        dict: Dicionário com título e conteúdo do artigo
        
    Raises:
        Exception: Se houver erro na geração do artigo
    """
    try:
        # Configuração do modelo
        model = genai.GenerativeModel('gemini-pro')
        
        # Prompt estruturado para gerar artigo
        full_prompt = f"""
        Você é um escritor profissional especializado em criar artigos para WordPress.
        
        Tópico: {topic}
        Instruções específicas: {prompt}
        Número de palavras: aproximadamente {word_count} palavras
        
        Por favor, gere um artigo completo com:
        1. Um título atrativo e SEO-friendly
        2. Conteúdo bem estruturado com introdução, desenvolvimento e conclusão
        3. Linguagem clara e acessível
        4. Formatação adequada para WordPress (pode usar HTML básico como <h2>, <h3>, <p>)
        5. Conclusão que incentive o leitor a continuar no site
        
        Retorne apenas o artigo formatado, sem explicações adicionais.
        """
        
        # Geração do artigo
        response = model.generate_content(full_prompt)
        
        if not response.text:
            raise Exception("Não foi possível gerar o artigo")
        
        # Separa título e conteúdo
        content = response.text.strip()
        
        # Extrai o título (primeira linha que parece um título)
        lines = content.split('\n')
        title = ""
        content_start = 0
        
        for i, line in enumerate(lines):
            line = line.strip()
            if line and not line.startswith('<') and len(line) < 100:
                title = line
                content_start = i + 1
                break
        
        # Se não encontrou título, usa o tópico
        if not title:
            title = topic
        
        # Conteúdo sem o título
        article_content = '\n'.join(lines[content_start:]).strip()
        
        return {
            "title": title,
            "content": article_content,
            "prompt": prompt
        }
        
    except Exception as e:
        raise Exception(f"Erro ao gerar artigo: {str(e)}")

def generate_article_variations(topic: str, base_prompt: str, variations: int = 3) -> list:
    """
    Gera variações de um artigo com diferentes abordagens.
    
    Args:
        topic (str): Tópico principal do artigo
        base_prompt (str): Prompt base
        variations (int): Número de variações a gerar
        
    Returns:
        list: Lista de artigos gerados
    """
    variation_prompts = [
        f"{base_prompt} Use uma abordagem mais técnica e detalhada.",
        f"{base_prompt} Foque em benefícios práticos e casos de uso.",
        f"{base_prompt} Use uma linguagem mais casual e conversacional.",
        f"{base_prompt} Inclua estatísticas e dados relevantes quando possível.",
        f"{base_prompt} Foque em resolver problemas específicos do leitor."
    ]
    
    articles = []
    
    for i in range(min(variations, len(variation_prompts))):
        try:
            article = generate_article(topic, variation_prompts[i])
            articles.append(article)
        except Exception as e:
            print(f"Erro ao gerar variação {i+1}: {str(e)}")
            continue
    
    return articles

def improve_article(content: str, improvement_type: str = "general") -> str:
    """
    Melhora um artigo existente.
    
    Args:
        content (str): Conteúdo do artigo
        improvement_type (str): Tipo de melhoria ("general", "seo", "readability")
        
    Returns:
        str: Artigo melhorado
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        improvement_prompts = {
            "general": "Melhore este artigo mantendo o mesmo conteúdo, mas com melhor estrutura e fluidez:",
            "seo": "Otimize este artigo para SEO, mantendo a qualidade do conteúdo:",
            "readability": "Torne este artigo mais fácil de ler e compreender:"
        }
        
        prompt = improvement_prompts.get(improvement_type, improvement_prompts["general"])
        full_prompt = f"{prompt}\n\n{content}"
        
        response = model.generate_content(full_prompt)
        
        if not response.text:
            raise Exception("Não foi possível melhorar o artigo")
        
        return response.text.strip()
        
    except Exception as e:
        raise Exception(f"Erro ao melhorar artigo: {str(e)}") 