#!/usr/bin/python3

'''
N queens
'''

from sys import argv


def is_NQueen(cell: list) -> bool:
    '''
    True if N Queen, False if not
    '''
    row_number = len(cell) - 1
    difference = 0
    for index in range(0, row_number):
        difference = cell[index] - cell[row_number]
        if difference < 0:
            difference *= -1
        if difference == 0 or difference == row_number - index:
            return False
    return True


def solve_NQeens(dimension: int, row: int, cell: list, outcome: list):
    """
    Return result of N Queens recusrivley
    """
    # Base case
    if row == dimension:
        print(outcome)
    else:
        for col in range(0, dimension):
            cell.append(col)
            outcome.append([row, col])
            if (is_NQueen(cell)):
                solve_NQeens(dimension, row + 1, cell, outcome)
            cell.pop()
            outcome.pop()


if len(argv) != 2:
    print('Usage: nqueens N')
    exit(1)
try:
    N = int(argv[1])
except BaseException:
    print('N must be a number')
    exit(1)
if N < 4:
    print('N must be at least 4')
    exit(1)
else:
    outcome = []
    cell = 0
    solve_NQeens(int(N), cell, [], outcome)
