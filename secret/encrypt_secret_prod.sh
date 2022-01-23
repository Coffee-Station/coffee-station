#!/bin/sh

gpg --symmetric --cipher-algo AES256 --batch --yes --passphrase $SECRET_PASSPHRASE_PROD prod.env