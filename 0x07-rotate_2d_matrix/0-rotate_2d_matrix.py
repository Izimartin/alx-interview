#!/usr/bin/python3

"""
Given an n x n 2D matrix, rotate it 90 degrees clockwise.
"""


def rotate_2d_matrix(matrix):
    """
    Rotates matrix 90 degress
    """

    row = len(matrix)
    column = row - 1

    for i in range(0, int(row / 2)):
        for j in range(i, column - i):
            temp = matrix[i][j]
            matrix[i][j] = matrix[column - j][i]
            matrix[column - j][i] = matrix[column - i][column - j]
            matrix[column - i][column - j] = matrix[j][column - i]
            matrix[j][column - i] = temp
