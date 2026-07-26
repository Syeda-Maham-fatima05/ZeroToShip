from typing import Set

_blacklisted_tokens: Set[str] = set()


def blacklist_token(token: str) -> None:
    _blacklisted_tokens.add(token)


def is_token_blacklisted(token: str) -> bool:
    return token in _blacklisted_tokens
