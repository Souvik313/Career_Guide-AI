import hashlib

def calculate_content_hash(file_bytes: bytes) -> str:
    """
    Calculate the SHA-256 hash of a file's contents.

    The same file contents will always produce
    the same 64-character hexadecimal hash.
    """

    return hashlib.sha256(file_bytes).hexdigest()