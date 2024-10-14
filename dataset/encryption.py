import bcrypt
import os 

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)


original_password = "password123"

hashed_password = hash_password(original_password)
print(f"Stored Hash: {hashed_password.decode('utf-8')}")