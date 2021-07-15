IMAGE_NAME := csjiang/express-docker
IMAGE_VERSION := $(shell jq '.version' package.json)

.PHONY: help docker interactive clean deploy-namespace deploy-dev

help:
	@echo 'Run "make docker" to build docker images.'
	@echo 'Run "make interactive" to start an interactive shell session inside of the docker container.  Exiting the container will delete it and any associated volumes.'

docker:
	docker build -t $(IMAGE_NAME):$(IMAGE_VERSION) -f ./Dockerfile .
	docker tag $(IMAGE_NAME):$(IMAGE_VERSION) $(IMAGE_NAME):latest

clean:
	docker rmi $(IMAGE_NAME):$(IMAGE_VERSION)
	docker image prune -f


# start an interactive session to verify a docker image build
interactive:
	set -ex;
	docker run -it --rm --privileged -v $(PWD):/mnt $(IMAGE_NAME):$(IMAGE_VERSION) /bin/bash# start an interactive session to verify a docker image build

deploy-namespace:
	set -ex;
	cd deploy && kubectl apply -f namespace.yml

deploy-dev:
	set -ex;
	cd deploy && kubectl apply -f deployment.yml,service.yml