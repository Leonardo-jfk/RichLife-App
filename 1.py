from pygame.examples.blend_fill import data_dir

number = int(input("your number: "))


def est_6_chiffres(correct_number):
    correct_number = abs(correct_number)
    return 100000 <= correct_number <= 999999

print(est_6_chiffres(number))

if est_6_chiffres(number):
    print(number)
    comparable = str(number)
    a = int(comparable[0])
    b = int(comparable[1])
    c = int(comparable[2])
    d = int(comparable[3])
    e = int(comparable[4])
    f = int(comparable[5])
    print(a, b, c, d, e, f)


    inverted_num = int(comparable[::-1])
    print(inverted_num)
    # equilibrado_check = abs(inverted_num - int(comparable))ESMESMESMESM
    equilibrado_check = abs(int(comparable) - inverted_num)

    # numeros invertidos
    comparable_inv = str(equilibrado_check).zfill(6)
    ai = int(comparable_inv[0])
    bi = int(comparable_inv[1])
    ci = int(comparable_inv[2])
    di = int(comparable_inv[3])
    ei = int(comparable_inv[4])
    fi = int(comparable_inv[5])
    print("equilibrados", ai, bi, ci, di, ei, fi)

    #ESM check
    if (a + b + c) == (d + e + f):
        print( "is a ESM number", comparable)

        if (ai + bi + ci) == (di + ei + fi):
            print( "is a equilibrado number", comparable_inv)

        else:
            print("balanciado")

    else:
        print( "is not a ESM number aka inestable", comparable)