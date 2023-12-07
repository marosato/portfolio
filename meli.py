#!/bin/python3

import math
import os
import random
import re
import sys
import requests
import json


#
# Complete the 'getVoteCount' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. STRING cityName
#  2. INTEGER estimatedCost
#  API URL: https://jsonmock.hackerrank.com/api/food_outlets?city=<cityName>&estimated_cost=<estimatedCost>
#

def getVoteCount(cityName, estimatedCost):
    # Write your code here
    
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    cityName = input()

    estimatedCost = int(input().strip())

    result = getVoteCount(cityName, estimatedCost)

    fptr.write(str(result) + '\n')

    fptr.close()
