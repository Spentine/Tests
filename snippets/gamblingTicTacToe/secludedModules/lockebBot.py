#Bot File
import random
import Module3
import Module4

class Bot:

    def __init__(self, chance, difficulty):
        self.chance = chance
        self.difficulty = difficulty
    
    def GainChance(self):
        self.chance = self.chance + 10
        if self.chance >= 100:
            self.chance = 100
            
    def Steal(self,row,column,stealChance):
        print(row, column)
        if Module3.Chance.CalculateChance(stealChance) == "Heads":
            if row == "top":
                Module4.top[column] = "O"
            if row == "mid":
                Module4.mid[column] = "O"
            if row == "low":
                Module4.low[column] = "O"
            self.chance = self.chance - 10
            if self.chance < 0:
                self.chance = 0
        else:
            Bot.GainChance(self)
    
    def RandomMove(self):
        randomMove = random.randrange(1,4)
        if randomMove == 1:
            randomMove = random.randrange(0,3)
            while Module4.top[randomMove] == "O" or (Module4.top[randomMove] == "X" and random.randint(1,100) >= self.chance):
                randomMove = random.randrange(0,3)
            if Module4.top[randomMove] == "X":
                Bot.Steal(self,"top",randomMove, self.chance)
            else:
                Module4.top[randomMove] = "O"
                Bot.GainChance(self)
        elif randomMove == 2:
            randomMove = random.randrange(0,3)
            while Module4.mid[randomMove] == "O" or (Module4.mid[randomMove] == "X" and random.randint(1,100) >= self.chance):
                randomMove = random.randrange(0,3)
            if Module4.mid[randomMove] == "X":
                Bot.Steal(self,"mid",randomMove, self.chance)
            else:
                Module4.mid[randomMove] = "O"
                Bot.GainChance(self)
        elif randomMove == 3:
            randomMove = random.randrange(0,3)
            while Module4.low[randomMove] == "O" or (Module4.low[randomMove] == "X" and random.randint(1,100) >= self.chance):
                randomMove = random.randrange(0,3)
            if random.randint(1,100) >= self.chance:
                while Module4.low[randomMove] == "X":
                    randomMove = random.randrange(0,3)
            if Module4.low[randomMove] == "X":
                Bot.Steal(self,"low",randomMove, self.chance)
            else:
                Module4.low[randomMove] = "O"
                Bot.GainChance(self)
        
    def BotMove(self):
        if random.randint(1,100) >= self.difficulty:
            randomMove = random.randrange(1,4)
            if randomMove == 1:
                while Module4.top[randomMove] == "O":
                    randomMove = random.randrange(0,3)
                randomMove = random.randrange(0,3)
                if Module4.top[randomMove] == "X":
                    Bot.Steal(self,"top",randomMove, self.chance)
                else:
                    Module4.top[randomMove] = "O"
                    Bot.GainChance(self)
            elif randomMove == 2:
                randomMove = random.randrange(0,3)
                while Module4.mid[randomMove] == "O":
                    randomMove = random.randrange(0,3)
                if Module4.mid[randomMove] == "X":
                    Bot.Steal(self,"mid",randomMove, self.chance)
                else:
                    Module4.mid[randomMove] = "O"
                    Bot.GainChance(self)
            elif randomMove == 3:
                randomMove = random.randrange(0,3)
                while Module4.low[randomMove] == "O":
                    randomMove = random.randrange(0,3)
                if Module4.low[randomMove] == "X":
                    Bot.Steal(self,"low",randomMove, self.chance)
                else:
                    Module4.low[randomMove] = "O"
                    Bot.GainChance(self)
        else:
            if Module4.top.count("O") == 2:                                                     #Horizontal Win on Top row
                try:
                    Bot.Steal(self,"top", Module4.top.index("X"), self.chance)
                except:
                    Module4.top[Module4.top.index(" ")] = "O"
                    Bot.GainChance(self)
            elif Module4.mid.count("O") == 2:                                                   #Horizontal Win on Mid row
                try:
                        Bot.Steal(self,"mid", Module4.mid.index("X"), self.chance)
                except:
                    Module4.mid[Module4.mid.index(" ")] = "O"
                    Bot.GainChance(self)
            elif Module4.low.count("O") == 2:                                                   #Horizontal Win on Low row
                try:
                    Bot.Steal(self,"low", Module4.low.index("X"), self.chance)
                except:
                    Module4.low[Module4.low.index(" ")] = "O"
                    Bot.GainChance(self)
            else:
                try:
                    if Module4.top.index("O") == Module4.mid.index("O"):                        #Vertical Win with 2 spaces on top
                        if Module4.low[Module4.top.index("O")] == "X":
                            Bot.Steal(self,"low",Module4.low.index("X"), self.chance)
                        else:
                            Module4.low[Module4.top.index("O")] = "O"
                            Bot.GainChance(self)
                    else:
                        print(CauseError)
                except:
                    try:
                        if Module4.mid.index("O") == Module4.low.index("O"):                    #Vertical Win with empty space in middle
                            if Module4.top[Module4.mid.index("O")] == "X":
                                Bot.Steal(self,"top",Module4.top.index("X"), self.chance)
                            else:
                                Module4.top[Module4.mid.index("O")] = "O"
                                Bot.GainChance(self)
                        else:
                            print(CauseError)
                    except:
                        try:
                            if Module4.top.index("O") == Module4.low.index("O"):
                                if Module4.mid[Module4.top.index("O")] == "X":
                                    Bot.Steal(self,"mid",Module4.mid.index("X"), self.chance)
                                else:
                                    Module4.mid[Module4.top.index("O")] = "O"
                                    Bot.GainChance(self)
                            else:
                                print(CauseError)
                        except:
                            if Module4.top[0] == "O" and Module4.mid[1] == "O":
                                if Module4.low[2] == "X":
                                    Bot.Steal(self,"low",2, self.chance)
                                else:
                                    Module4.low[2] = "O"
                                    Bot.GainChance(self)
                            elif Module4.top[2] == "O" and Module4.mid[1] == "O":
                                if Module4.low[0] == "X":
                                    Bot.Steal(self,"low",0, self.chance)
                                else:
                                    Module4.low[0] = "O"
                                    Bot.GainChance(self)
                            elif Module4.low[0] == "O" and Module4.mid[1] == "O":
                                if Module4.top[2] == "X":
                                    Bot.Steal(self,"top",2, self.chance)
                                else:
                                    Module4.top[2] = "O"
                                    Bot.GainChance(self)
                            elif Module4.low[2] == "O" and Module4.mid[1] == "O":
                                if Module4.top[0] == "X":
                                    Bot.Steal(self,"top",0, self.chance)
                                else:
                                    Module4.top[0] = "O"
                                    Bot.GainChance(self)
                            elif Module4.top[0] == "O" and Module4.low[2] == "O":
                                if Module4.mid[1] == "X":
                                    Bot.Steal(self,"mid",1, self.chance)
                                else:
                                    Module4.mid[1] = "O"
                                    Bot.GainChance(self)
                            elif Module4.top[2] == "O" and Module4.low[0] == "O":
                                if Module4.mid[1] == "X":
                                    Bot.Steal(self,"mid",1, self.chance)
                                else:
                                    Module4.mid[1] = "O"
                                    Bot.GainChance(self)
                            else:
                                if Module4.top.count("X") == 2:
                                    try:
                                        if random.randint(1,100) <= self.chance:
                                            if Module4.top[0] == "X":
                                                Bot.Steal(self,"top", Module4.top.index("X"), self.chance)
                                            else:
                                                Bot.Steal(self,"top", 2, self.chance)
                                        else:
                                            Module4.top[Module4.top.index(" ")] = "O"
                                            Bot.GainChance(self)
                                    except:
                                        Bot.Steal(self,"top", Module4.top.index("X"), self.chance)
                                elif Module4.mid.count("X") == 2:
                                    try:
                                        if random.randint(1,100) <= self.chance:
                                            if Module4.mid[1] == "X":
                                                Bot.Steal(self,"mid", 1, self.chance)
                                            else:
                                                Bot.Steal(self,"mid", Module4.mid.index("X"), self.chance)
                                        else:
                                            Module4.mid[Module4.mid.index(" ")] = "O"
                                            Bot.GainChance(self)
                                    except:
                                        if Module4.mid[1] == "X":
                                            Bot.Steal(self,"mid", 1, self.chance)
                                        else:
                                            Bot.Steal(self,"mid", Module4.mid.index("X"), self.chance)
                                elif Module4.low.count("X") == 2:
                                    try:
                                        if random.randint(1,100) <= self.chance:
                                            if Module4.low[0] == " ":
                                                Bot.Steal(self,"low", 2, self.chance)
                                            else:
                                                Bot.Steal(self,"low", Module4.low.index("X"), self.chance)
                                        else:
                                            Module4.low[Module4.low.index(" ")] = "O"
                                            Bot.GainChance(self)
                                    except:
                                        Bot.Steal(self,"low", Module4.low.index("X"), self.chance)
                                else:
                                    try:
                                        if Module4.top.index("X") == Module4.mid.index("X"):
                                            if Module4.low[Module4.top.index("X")] == "O":
                                                if Module4.top.index("X") == 1:
                                                    Bot.Steal(self,"mid",Module4.mid.index("O"), self.chance)
                                                else:
                                                    Bot.Steal(self,"top",Module4.low.index("O"), self.chance)
                                            else:
                                                if random.randint(1,100) <= self.chance:
                                                    if Module4.top.index("X") == 1:
                                                        Bot.Steal(self,"mid",Module4.mid.index("X"), self.chance)
                                                    else:
                                                        Bot.Steal(self,"top", Module4.top.index("X"), self.chance)
                                                else:
                                                    Module4.low[Module4.top.index("X")] = "O"
                                                    Bot.GainChance(self)
                                        else:
                                            print(CauseError)
                                    except:
                                        try:
                                            if Module4.mid.index("X") == Module4.low.index("X"):
                                                if Module4.top[Module4.low.index("X")] == "O":
                                                    if Module4.low.index("X") == 1:
                                                        Bot.Steal(self,"mid",Module4.mid.index("O"), self.chance)
                                                    else:
                                                        Bot.Steal(self,"low",Module4.top.index("O"), self.chance)
                                                else:
                                                    if random.randint(1,100) <= self.chance:
                                                        if Module4.low.index("X") == 1:
                                                            Bot.Steal(self,"mid",Module4.mid.index("X"), self.chance)
                                                        else:
                                                            Bot.Steal(self,"low", Module4.low.index("X"), self.chance)
                                                    else:
                                                        Module4.top[Module4.mid.index("X")] = "O"
                                                        Bot.GainChance(self)
                                            else:
                                                print(CauseError)
                                        except:
                                            try:
                                                if Module4.top.index("X") == Module4.low.index("X"):
                                                    if Module4.mid[Module4.top.index("X")] == "O":
                                                        Bot.Steal(self,"top",Module4.mid.index("O"), self.chance)
                                                    else:
                                                        if random.randint(1,100) <= self.chance:
                                                            Bot.Steal(self,"top", Module4.top.index("X"), self.chance)
                                                        else:
                                                            Module4.mid[Module4.top.index("X")] = "O"
                                                            Bot.GainChance(self)
                                                else:
                                                    print(CauseError)
                                            except:
                                                if Module4.top[0] == "X" and (Module4.mid[1] == "X" or Module4.low[2] == "X"):
                                                    if Module4.mid[1] == "X":
                                                        try:
                                                            if Module4.low[2] == " ":
                                                                print(CauseError)
                                                            if random.randint(1,100) >= self.chance:
                                                                Bot.RandomMove(self)
                                                            else:
                                                                Bot.Steal(self,"mid",Module4.mid[1], self.chance)
                                                        except:
                                                            if random.randint(1,100) <= self.chance:
                                                                Bot.Steal(self,"mid", 1, self.chance)
                                                            else:
                                                                Module4.low[2] = "O"
                                                                Bot.GainChance(self)
                                                    elif Module4.low[2] == "X":
                                                        try:
                                                            if Module4.mid[1] == " ":
                                                                print(CauseError)
                                                            if random.randint(1,100) >= self.chance:
                                                                Bot.RandomMove(self)
                                                            else:
                                                                Bot.Steal(self,"top", 0, self.chance)
                                                        except:
                                                            if random.randint(1,100) <= self.chance:
                                                                Bot.Steal(self,"top", 0, self.chance)
                                                            else:
                                                                Module4.mid[1] = "O"
                                                                Bot.GainChance(self)
                                                elif Module4.top[2] == "X" and (Module4.mid[1] == "X" or Module4.low[0] == "X"):
                                                    if Module4.mid[1] == "X":
                                                        try:
                                                            if Module4.low[0] == " ":
                                                                print(CauseError)
                                                            if random.randint(1,100) >= self.chance:
                                                                Bot.RandomMove(self)
                                                            else:
                                                                Bot.Steal(self,"mid", 1, self.chance)
                                                        except:
                                                            if random.randint(1,100) <= self.chance:
                                                                Bot.Steal(self,"mid", 1, self.chance)
                                                            else:
                                                                Module4.low[0] = "O"
                                                                Bot.GainChance(self)
                                                    elif Module4.low[0] == "X":
                                                        try:
                                                            if Module4.low[2] == " ":
                                                                print(CauseError)
                                                            if random.randint(1,100) >= self.chance:
                                                                Bot.RandomMove(self)
                                                            else:
                                                                Bot.Steal(self,"top", 2, self.chance)
                                                        except:
                                                            if random.randint(1,100) <= self.chance:
                                                                Bot.Steal(self,"top", 2, self.chance)
                                                            else:
                                                                Module4.mid[1] = "O"
                                                                Bot.GainChance(self)
                                                else:
                                                    Bot.RandomMove(self)