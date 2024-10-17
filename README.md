# Overall Description

The folder structure is divided into `frontend` and `backend`. Each folder has its own `README.md` file describing further technical details.

# Prerequisites

- Docker + Docker Compose / Docker Desktop
- Fill up env file

Run `docker compose up -d` to start the containers in detached mode.

The app should be accessible on the following ports:

- Backend: **3000**
- Frontend: **4173**

### Note

Ensure that you fulfill the prerequisites mentioned in the `frontend/README.md` and `backend/README.md` files to run the app locally.

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

# Husky

Husky is used as a pre-commit helper to run linting scripts.\
 To add new scripts, modify the `/frontend/.husky/pre-commit` file and add the necessary scripts there.

# Further Development

The app can potentially be extended by adding a Dockerized immudb instance. Here's an example of how to add immudb to `docker-compose`:

```yaml
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

Add the following to the backend container:

```yaml
depends_on:
  - immudb
```

## Troubleshooting

If you encounter the following error:
ERROR [backend internal] load metadata for docker.io/library....\
To fix the issue, run the following command: `rm ~/.docker/config.json`

Source: [Stackoverflow](https://stackoverflow.com/questions/66912085/why-is-docker-compose-failing-with-error-internal-load-metadata-suddenly)

# Comments

### Private Hosting #bragging

I used to host apps like this on my private home lab, utilizing [https-portal](https://hub.docker.com/r/steveltn/https-portal/dockerfile), which includes Nginx, making it easy for developers to configure. Alternatively, I used Certbot for SSL management. I also set up GitLab, automated backups, and even created an uninterruptible power supply (UPS) and electrical box for my servers. Feel free to ask if you want more details on this setup.

### Cloud immudb

While working with the immudb cloud API, I experienced intermittent issues where data uploads would sometimes fail due to too many requests. Records would disappear from the UI with only a red rectangle and exclamation mark as feedback. Providing a proper error message would significantly improve the user experience.

### Summary

Most of my time was spent configuring the technology stack. However, now that the configuration is in place, it provides a solid foundation for developers to build upon, ensuring the project remains simple, atomic, tested, and well-maintained. Tailwind CSS greatly supports the app's responsiveness, including dark and light themes.

I haven't dedicated extra time to writing tests or Storybook stories. The project serves primarily as a proof of concept (PoC) to demonstrate my approach to building apps and my technology choices, as briefly described above.

I intentionally avoided using components like Tanstack Table to showcase that I know how to build components from scratch. This project leverages my experience with various libraries, allowing it to grow easily while remaining scalable.
