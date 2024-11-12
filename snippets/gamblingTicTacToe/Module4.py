# DrawBoard
# Created by Lockeb

top = [" "," "," "]
mid = [" "," "," "]   #figure out how to get player/bot input
low = [" "," "," "]

def DrawBoard():
    r = ("\n---+---+---\n ")
    d = (" | ")
    print (" " + top[0] + d + top[1] + d + top[2] + r + mid[0] + d + mid[1] + d + mid[2] + r + low[0] + d + low[1] + d + low[2])