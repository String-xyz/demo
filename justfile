set dotenv-load
export AWS_DEFAULT_PROFILE := ENV + "-string"
ENV := "dev"
APP := "demo"
DEMO_APP := "demo-app"
ECS_CLUSTER := "web-app"
AWS_REGION := "us-west-2"
ECR := "$ACCT.dkr.ecr.us-west-2.amazonaws.com"
ECS_APP_REPO := ECR+"/"+APP
DEMO_APP_REPO:= ECR+"/"+DEMO_APP

all TAG="latest": (build TAG) (push TAG) deploy

all-demo TAG="latest": (build-demo TAG) (push-demo TAG) deploy-demo

build TAG:
	docker build -t {{ECS_APP_REPO}}:{{TAG}} .

push TAG:
	aws ecr get-login-password --region {{AWS_REGION}} | docker login --username AWS --password-stdin {{ECS_APP_REPO}}
	docker push {{ECS_APP_REPO}}:{{TAG}}

deploy:
	aws ecs --region {{AWS_REGION}} update-service --cluster {{ECS_CLUSTER}} --service {{APP}} --force-new-deployment

build-demo TAG:
	docker build --platform linux/amd64 -t {{DEMO_APP_REPO}}:{{TAG}} .

push-demo TAG:
	aws ecr get-login-password --region {{AWS_REGION}} | docker login --username AWS --password-stdin {{DEMO_APP_REPO}}
	docker push {{DEMO_APP_REPO}}:{{TAG}}

deploy-demo:
	aws ecs --region {{AWS_REGION}} update-service --cluster {{ECS_CLUSTER}} --service {{DEMO_APP}} --force-new-deployment