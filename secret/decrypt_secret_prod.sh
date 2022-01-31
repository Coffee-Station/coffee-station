#!/bin/sh
cd $GITHUB_WORKSPACE

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_PROD" --output \
secret/.env \
secret/prod.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_PROD" --output \
backend/runner/build.gradle \
backend/runner/prod.build.gradle.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_PROD" --output \
backend/runner/src/main/resources/application.yml \
backend/runner/src/main/resources/prod.application.yml.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_LOCAL" --output \
backend/runner/src/main/resources/firebase/firebase-notification-key.json \
backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
