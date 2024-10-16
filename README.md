# Overall description

Folders structure is divided on frontend / backend. Both folders have it's own README file describing further their technical details.

The whole app is dedicated to ARM architecture.

# Prerequisites

- docker + docker-compose / docker desktop

Run `docker compose up -d` to run containers in detached mode.

The app should be accessible on ports:

- backend <strong>3000</strong>
- frontend <strong>4173</strong>

### Keep in mind to fulfill frontend / backend folders prerequisites to run app locally.

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

### Husky

Is being used as pre-commit helper running linting script.
To add new scripts, use `/frontend/.husky/pre-commit` file and add scripts there.

# Further development.

The app could be possibly extended by adding dockerized immudb and wrap everything locally. Example addition of immudb for docker-compose.

```
immudb:
    image: codenotary/immudb:latest
    container_name: immudb
    ports:
      - "3322:3322"
      - "8080:8080"
    environment:
      - IMMUDB_ADMIN_PASSWORD=immudb
    volumes:
      - immudb_data:/var/lib/immudb
```

Add to backend container:

```
    depends_on:
      - immudb
```

# Comments:

### Cloud immudb

While working with the api, once I was able to upload data, the other time I was being blocked due to too many requests. Records dissapeared from the UI too with single red rectangle and exclamation mark. No error message was provided to the user - adding a message instead only red sign could improve UX.
