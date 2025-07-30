"""
Módulo de Funções Matemáticas

Este módulo contém uma coleção de funções matemáticas úteis para cálculos básicos e avançados.
Inclui operações aritméticas, funções trigonométricas, estatísticas e outras utilidades matemáticas.

Autor: Sistema
Data: 2024
"""

import math
import statistics
from typing import List, Union, Tuple, Optional


def soma(a: float, b: float) -> float:
    """
    Realiza a soma de dois números.
    
    Esta função recebe dois números e retorna a soma deles.
    Funciona com números inteiros e decimais.
    
    Args:
        a (float): Primeiro número para a soma
        b (float): Segundo número para a soma
        
    Returns:
        float: Resultado da soma de a + b
        
    Examples:
        >>> soma(5, 3)
        8.0
        >>> soma(2.5, 3.7)
        6.2
    """
    return a + b


def subtracao(a: float, b: float) -> float:
    """
    Realiza a subtração de dois números.
    
    Esta função recebe dois números e retorna a diferença entre eles.
    
    Args:
        a (float): Número do qual será subtraído
        b (float): Número a ser subtraído
        
    Returns:
        float: Resultado da subtração de a - b
        
    Examples:
        >>> subtracao(10, 3)
        7.0
        >>> subtracao(5.5, 2.3)
        3.2
    """
    return a - b


def multiplicacao(a: float, b: float) -> float:
    """
    Realiza a multiplicação de dois números.
    
    Esta função recebe dois números e retorna o produto deles.
    
    Args:
        a (float): Primeiro fator da multiplicação
        b (float): Segundo fator da multiplicação
        
    Returns:
        float: Resultado da multiplicação de a * b
        
    Examples:
        >>> multiplicacao(4, 5)
        20.0
        >>> multiplicacao(2.5, 3)
        7.5
    """
    return a * b


def divisao(a: float, b: float) -> float:
    """
    Realiza a divisão de dois números.
    
    Esta função recebe dois números e retorna o quociente da divisão.
    Inclui verificação para divisão por zero.
    
    Args:
        a (float): Numerador (dividendo)
        b (float): Denominador (divisor)
        
    Returns:
        float: Resultado da divisão de a / b
        
    Raises:
        ValueError: Se o divisor (b) for zero
        
    Examples:
        >>> divisao(10, 2)
        5.0
        >>> divisao(7, 3)
        2.3333333333333335
    """
    if b == 0:
        raise ValueError("Erro: Divisão por zero não é permitida!")
    return a / b


def potencia(base: float, expoente: float) -> float:
    """
    Calcula a potência de um número.
    
    Esta função eleva a base ao expoente especificado.
    
    Args:
        base (float): Número base
        expoente (float): Expoente ao qual a base será elevada
        
    Returns:
        float: Resultado de base elevado ao expoente
        
    Examples:
        >>> potencia(2, 3)
        8.0
        >>> potencia(5, 2)
        25.0
    """
    return math.pow(base, expoente)


def raiz_quadrada(numero: float) -> float:
    """
    Calcula a raiz quadrada de um número.
    
    Esta função calcula a raiz quadrada de um número não negativo.
    
    Args:
        numero (float): Número para calcular a raiz quadrada
        
    Returns:
        float: Raiz quadrada do número
        
    Raises:
        ValueError: Se o número for negativo
        
    Examples:
        >>> raiz_quadrada(16)
        4.0
        >>> raiz_quadrada(2)
        1.4142135623730951
    """
    if numero < 0:
        raise ValueError("Erro: Não é possível calcular raiz quadrada de número negativo!")
    return math.sqrt(numero)


def fatorial(n: int) -> int:
    """
    Calcula o fatorial de um número inteiro não negativo.
    
    O fatorial de um número n é o produto de todos os números inteiros de 1 até n.
    
    Args:
        n (int): Número para calcular o fatorial
        
    Returns:
        int: Fatorial do número n
        
    Raises:
        ValueError: Se o número for negativo
        
    Examples:
        >>> fatorial(5)
        120
        >>> fatorial(0)
        1
    """
    if n < 0:
        raise ValueError("Erro: Fatorial não é definido para números negativos!")
    if n == 0 or n == 1:
        return 1
    return n * fatorial(n - 1)


def media_aritmetica(numeros: List[float]) -> float:
    """
    Calcula a média aritmética de uma lista de números.
    
    Esta função calcula a soma de todos os números dividida pela quantidade de números.
    
    Args:
        numeros (List[float]): Lista de números para calcular a média
        
    Returns:
        float: Média aritmética dos números
        
    Raises:
        ValueError: Se a lista estiver vazia
        
    Examples:
        >>> media_aritmetica([1, 2, 3, 4, 5])
        3.0
        >>> media_aritmetica([10, 20, 30])
        20.0
    """
    if not numeros:
        raise ValueError("Erro: Lista vazia não pode ter média calculada!")
    return sum(numeros) / len(numeros)


def mediana(numeros: List[float]) -> float:
    """
    Calcula a mediana de uma lista de números.
    
    A mediana é o valor central de uma lista ordenada de números.
    Se a lista tem um número par de elementos, a mediana é a média dos dois valores centrais.
    
    Args:
        numeros (List[float]): Lista de números para calcular a mediana
        
    Returns:
        float: Mediana dos números
        
    Raises:
        ValueError: Se a lista estiver vazia
        
    Examples:
        >>> mediana([1, 3, 5, 7, 9])
        5.0
        >>> mediana([1, 2, 3, 4])
        2.5
    """
    if not numeros:
        raise ValueError("Erro: Lista vazia não pode ter mediana calculada!")
    return statistics.median(numeros)


def seno(angulo_graus: float) -> float:
    """
    Calcula o seno de um ângulo em graus.
    
    Esta função converte o ângulo de graus para radianos e calcula o seno.
    
    Args:
        angulo_graus (float): Ângulo em graus
        
    Returns:
        float: Seno do ângulo
        
    Examples:
        >>> seno(30)
        0.5
        >>> seno(90)
        1.0
    """
    angulo_radianos = math.radians(angulo_graus)
    return math.sin(angulo_radianos)


def cosseno(angulo_graus: float) -> float:
    """
    Calcula o cosseno de um ângulo em graus.
    
    Esta função converte o ângulo de graus para radianos e calcula o cosseno.
    
    Args:
        angulo_graus (float): Ângulo em graus
        
    Returns:
        float: Cosseno do ângulo
        
    Examples:
        >>> cosseno(0)
        1.0
        >>> cosseno(60)
        0.5
    """
    angulo_radianos = math.radians(angulo_graus)
    return math.cos(angulo_radianos)


def tangente(angulo_graus: float) -> float:
    """
    Calcula a tangente de um ângulo em graus.
    
    Esta função converte o ângulo de graus para radianos e calcula a tangente.
    
    Args:
        angulo_graus (float): Ângulo em graus
        
    Returns:
        float: Tangente do ângulo
        
    Raises:
        ValueError: Se o ângulo for 90° ou 270° (onde tangente não é definida)
        
    Examples:
        >>> tangente(45)
        1.0
        >>> tangente(30)
        0.5773502691896257
    """
    angulo_radianos = math.radians(angulo_graus)
    if abs(math.cos(angulo_radianos)) < 1e-10:
        raise ValueError("Erro: Tangente não é definida para este ângulo!")
    return math.tan(angulo_radianos)


def logaritmo_natural(numero: float) -> float:
    """
    Calcula o logaritmo natural (ln) de um número.
    
    Esta função calcula o logaritmo natural usando a base e (número de Euler).
    
    Args:
        numero (float): Número para calcular o logaritmo natural
        
    Returns:
        float: Logaritmo natural do número
        
    Raises:
        ValueError: Se o número for menor ou igual a zero
        
    Examples:
        >>> logaritmo_natural(1)
        0.0
        >>> logaritmo_natural(math.e)
        1.0
    """
    if numero <= 0:
        raise ValueError("Erro: Logaritmo natural não é definido para números <= 0!")
    return math.log(numero)


def logaritmo_decimal(numero: float) -> float:
    """
    Calcula o logaritmo decimal (log base 10) de um número.
    
    Esta função calcula o logaritmo usando a base 10.
    
    Args:
        numero (float): Número para calcular o logaritmo decimal
        
    Returns:
        float: Logaritmo decimal do número
        
    Raises:
        ValueError: Se o número for menor ou igual a zero
        
    Examples:
        >>> logaritmo_decimal(100)
        2.0
        >>> logaritmo_decimal(10)
        1.0
    """
    if numero <= 0:
        raise ValueError("Erro: Logaritmo decimal não é definido para números <= 0!")
    return math.log10(numero)


def valor_absoluto(numero: float) -> float:
    """
    Calcula o valor absoluto de um número.
    
    Esta função retorna o valor absoluto (módulo) de um número.
    
    Args:
        numero (float): Número para calcular o valor absoluto
        
    Returns:
        float: Valor absoluto do número
        
    Examples:
        >>> valor_absoluto(-5)
        5.0
        >>> valor_absoluto(3.7)
        3.7
    """
    return abs(numero)


def arredondar(numero: float, casas_decimais: int = 0) -> float:
    """
    Arredonda um número para um número específico de casas decimais.
    
    Esta função arredonda um número para o número de casas decimais especificado.
    
    Args:
        numero (float): Número a ser arredondado
        casas_decimais (int, optional): Número de casas decimais. Padrão é 0
        
    Returns:
        float: Número arredondado
        
    Examples:
        >>> arredondar(3.14159, 2)
        3.14
        >>> arredondar(3.14159)
        3.0
    """
    return round(numero, casas_decimais)


def maximo(numeros: List[float]) -> float:
    """
    Encontra o valor máximo em uma lista de números.
    
    Esta função retorna o maior valor presente na lista.
    
    Args:
        numeros (List[float]): Lista de números
        
    Returns:
        float: Valor máximo da lista
        
    Raises:
        ValueError: Se a lista estiver vazia
        
    Examples:
        >>> maximo([1, 5, 3, 9, 2])
        9.0
        >>> maximo([-10, -5, -20])
        -5.0
    """
    if not numeros:
        raise ValueError("Erro: Lista vazia não tem valor máximo!")
    return max(numeros)


def minimo(numeros: List[float]) -> float:
    """
    Encontra o valor mínimo em uma lista de números.
    
    Esta função retorna o menor valor presente na lista.
    
    Args:
        numeros (List[float]): Lista de números
        
    Returns:
        float: Valor mínimo da lista
        
    Raises:
        ValueError: Se a lista estiver vazia
        
    Examples:
        >>> minimo([1, 5, 3, 9, 2])
        1.0
        >>> minimo([-10, -5, -20])
        -20.0
    """
    if not numeros:
        raise ValueError("Erro: Lista vazia não tem valor mínimo!")
    return min(numeros)


def eh_par(numero: int) -> bool:
    """
    Verifica se um número é par.
    
    Esta função retorna True se o número for par e False caso contrário.
    
    Args:
        numero (int): Número a ser verificado
        
    Returns:
        bool: True se o número for par, False caso contrário
        
    Examples:
        >>> eh_par(4)
        True
        >>> eh_par(7)
        False
    """
    return numero % 2 == 0


def eh_primo(numero: int) -> bool:
    """
    Verifica se um número é primo.
    
    Um número primo é um número natural maior que 1 que tem apenas dois divisores: 1 e ele mesmo.
    
    Args:
        numero (int): Número a ser verificado
        
    Returns:
        bool: True se o número for primo, False caso contrário
        
    Examples:
        >>> eh_primo(7)
        True
        >>> eh_primo(4)
        False
    """
    if numero < 2:
        return False
    if numero == 2:
        return True
    if numero % 2 == 0:
        return False
    
    for i in range(3, int(math.sqrt(numero)) + 1, 2):
        if numero % i == 0:
            return False
    return True


def mdc(a: int, b: int) -> int:
    """
    Calcula o Máximo Divisor Comum (MDC) de dois números.
    
    Esta função usa o algoritmo de Euclides para calcular o MDC.
    
    Args:
        a (int): Primeiro número
        b (int): Segundo número
        
    Returns:
        int: MDC dos dois números
        
    Examples:
        >>> mdc(48, 18)
        6
        >>> mdc(12, 8)
        4
    """
    while b:
        a, b = b, a % b
    return abs(a)


def mmc(a: int, b: int) -> int:
    """
    Calcula o Mínimo Múltiplo Comum (MMC) de dois números.
    
    Esta função calcula o MMC usando a relação: MMC(a,b) = |a*b| / MDC(a,b)
    
    Args:
        a (int): Primeiro número
        b (int): Segundo número
        
    Returns:
        int: MMC dos dois números
        
    Examples:
        >>> mmc(12, 18)
        36
        >>> mmc(8, 12)
        24
    """
    return abs(a * b) // mdc(a, b)


# Função para demonstrar o uso das funções matemáticas
def demonstrar_funcoes():
    """
    Função de demonstração que mostra como usar as funções matemáticas.
    
    Esta função executa exemplos de uso de várias funções matemáticas
    e imprime os resultados para demonstração.
    
    Returns:
        None
        
    Examples:
        >>> demonstrar_funcoes()
        # Executa exemplos e imprime resultados
    """
    print("=== Demonstração das Funções Matemáticas ===\n")
    
    # Exemplos básicos
    print(f"Soma: 5 + 3 = {soma(5, 3)}")
    print(f"Subtração: 10 - 4 = {subtracao(10, 4)}")
    print(f"Multiplicação: 6 * 7 = {multiplicacao(6, 7)}")
    print(f"Divisão: 15 / 3 = {divisao(15, 3)}")
    print(f"Potência: 2^8 = {potencia(2, 8)}")
    print(f"Raiz quadrada de 16 = {raiz_quadrada(16)}")
    print(f"Fatorial de 5 = {fatorial(5)}")
    
    # Exemplos com listas
    numeros = [1, 3, 5, 7, 9, 11]
    print(f"\nLista: {numeros}")
    print(f"Média aritmética = {media_aritmetica(numeros)}")
    print(f"Mediana = {mediana(numeros)}")
    print(f"Máximo = {maximo(numeros)}")
    print(f"Mínimo = {minimo(numeros)}")
    
    # Exemplos trigonométricos
    print(f"\nSeno de 30° = {seno(30)}")
    print(f"Cosseno de 60° = {cosseno(60)}")
    print(f"Tangente de 45° = {tangente(45)}")
    
    # Exemplos de logaritmos
    print(f"\nLogaritmo natural de e = {logaritmo_natural(math.e)}")
    print(f"Logaritmo decimal de 100 = {logaritmo_decimal(100)}")
    
    # Exemplos de verificação
    print(f"\n8 é par? {eh_par(8)}")
    print(f"7 é par? {eh_par(7)}")
    print(f"17 é primo? {eh_primo(17)}")
    print(f"4 é primo? {eh_primo(4)}")
    
    # Exemplos de MDC e MMC
    print(f"\nMDC de 48 e 18 = {mdc(48, 18)}")
    print(f"MMC de 12 e 18 = {mmc(12, 18)}")
    
    print("\n=== Demonstração Concluída ===")


if __name__ == "__main__":
    # Executa a demonstração quando o arquivo for executado diretamente
    demonstrar_funcoes() 