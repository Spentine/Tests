import scratchattach as scratch3
import sqlite3

session = scratch3.login("USERNAME", "PASSWORD") # enter login

conn = session.connect_cloud(123456789) # enter ID of project

client = scratch3.CloudRequests(conn)

db = sqlite3.connect("wisdom-gainers.db")
cursor = db.cursor()

# if it doesnt exist then create it

cursor.execute('''
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    wisdom_count INTEGER
  )
''') # init db with id, name, and activation count

# === wisdom ===
wisdoms = """
wisdom 1
wisdom 2
wisdom 3
wisdom 4
wisdom 5
etc continue this
""".splitlines()[1::]
wisdomcount = len(wisdoms)
# ==============

@client.request
def wisdom(username):
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if user:
      wisdom_count = ((user[2] + 1) % wisdomcount)
      cursor.execute("UPDATE users SET wisdom_count = ? WHERE username = ?", (wisdom_count, username))
    else:
      wisdom_count = user[2]
      cursor.execute("INSERT INTO users (username, wisdom_count) VALUES (?, 0)", (username,))
    db.commit()
    
    grantedWisdom = wisdoms[wisdom_count]
    print(f"granted wisdom {wisdom_count + 1} to {username}: {grantedWisdom}")
    return grantedWisdom

try:
  client.run()
finally:
  print("DB closed")
  db.close()
