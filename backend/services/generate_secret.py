import secrets

# 32 bytes = 256 bits — meets PyJWT's HS256 minimum
secret_key = secrets.token_urlsafe(32)
print(secret_key)