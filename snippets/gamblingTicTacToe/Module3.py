# Chance File
# Created by Lockeb

import random

class Chance:
    def init(self,Chances):
        self.Chances = Chances
    def CalculateChance(Chances):
        for i in range(0,1):
            calculateChance = random.randint(1,100)
            if calculateChance <= Chances:
                return ("Heads")
            else:
                return ("Tails")