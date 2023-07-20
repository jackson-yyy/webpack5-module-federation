build-single-image:
	@docker build -f Dockerfile -t ccr.ccs.tencentyun.com/yb_study/module-federation-demo:single-app .
	@docker push ccr.ccs.tencentyun.com/yb_study/module-federation-demo:single-app

build-multi-image:
	@docker build -f ./packages/base/Dockerfile -t ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-base ./packages/base
	@docker push ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-base

	@docker build -f ./packages/app1/Dockerfile -t ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-1 
	@docker push ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-1

	@docker build -f ./packages/app2/Dockerfile -t ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-2 .
	@docker push ccr.ccs.tencentyun.com/yb_study/module-federation-demo:multi-app-2