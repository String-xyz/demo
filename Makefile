include .env

export
AWS_DEFAULT_PROFILE=${env}-string
APP=app
ECS_CLUSTER=web-app
SERVICE_TAG=${tag}
AWS_REGION=us-west-2
ECR=${ACCT}.dkr.ecr.us-west-2.amazonaws.com
ECS_APP_REPO=${ECR}/${APP}

all: build push deploy

test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )
	@[ "${tag}" ] || ( echo "env tag is not set"; exit 1 )

build: test-envvars
	docker build --platform linux/amd64 -t $(ECS_APP_REPO):${SERVICE_TAG} .

push: test-envvars
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECS_APP_REPO)
	docker push $(ECS_APP_REPO):${SERVICE_TAG}

deploy: test-envvars
	aws ecs --region $(AWS_REGION) update-service --cluster $(ECS_CLUSTER) --service ${APP} --force-new-deployment
