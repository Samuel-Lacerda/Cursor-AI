import math

x1 = math.pi
print(x1)

def soma(a, b):
    return a + b

print(soma(1, 2))



def array_differenc(a, b):
    return [x for x in a if x not in b]

print(array_differenc([1, 2, 3, 4, 5], [1, 2, 3]))




def encontrar_vogais(a):
    vogais = "aeiou"
    return [letra for letra in a if letra in vogais]

print(encontrar_vogais("teste"))




