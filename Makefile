include .env

export
AWS_DEFAULT_PROFILE=${env}-string
APP=app
DEMO_APP=demo-app
ECS_CLUSTER=web-app
SERVICE_TAG=${tag}
AWS_REGION=us-west-2
ECR=${ACCT}.dkr.ecr.us-west-2.amazonaws.com
ECS_APP_REPO=${ECR}/${APP}
DEMO_APP_REPO=${ECR}/${DEMO_APP}

all: build push deploy
all-demo: build-demo push-demo deploy-demo

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

build-demo: test-envvars
	docker build --platform linux/amd64 -t $(DEMO_APP_REPO):${SERVICE_TAG} .

push-demo: test-envvars
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(DEMO_APP_REPO)
	docker push $(DEMO_APP_REPO):${SERVICE_TAG}

deploy-demo: test-envvars
	aws ecs --region $(AWS_REGION) update-service --cluster $(ECS_CLUSTER) --service ${DEMO_APP} --force-new-deployment