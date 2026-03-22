# Development build

## Build container

podman build -t cv_fe:latest .

## Run container

podman kube play dev.yaml --replace     

# Push to registry

## Tag container

### Option 1: Tag already built container
podman tag cv_fe:latest harbor.local/cv/fe:latest
podman tag cv_fe:latest harbor.local/cv/fe:<version>

### Option 2: Build and tag in one step
podman build -t harbor.local/cv/fe:latest -t harbor.local/cv/fe:<version> .

## Push to registry

podman login --tls-verify=false harbor.local

podman push --tls-verify=false harbor.local/cv/fe:latest
podman push --tls-verify=false harbor.local/cv/fe:<version>

## Test containers locally

podman build -f Dockerfile.dev_container -t cv_fe-dev-container:latest .
podman build . -t cv_be:latest

podman kube play dev-container.yaml --replace