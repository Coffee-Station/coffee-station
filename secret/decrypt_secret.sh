#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$GITHUB_WORKSPACE/secret/.env_test \
$GITHUB_WORKSPACE/secret/.env_test.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$GITHUB_WORKSPACE/backend/runner/src/main/resources/firebase/firebase-notification-key.json \
$GITHUB_WORKSPACE/backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
